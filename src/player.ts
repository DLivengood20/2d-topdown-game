import { AttackHandler } from './attackHandler';
import { Enemy } from './enemy';
import { FacingAngles } from './facingAngles';
import { Weapon } from './weapon';
import { WeaponList } from './weaponList';

export class Player {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private attack: AttackHandler;
  x: number;
  y: number;
  width: number;
  height: number;
  private health: number;
  private color: string;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  private stunColor: string;
  private defaultColor: string;
  private faceColor: string;
  speed: number;
  diagonalSpeed: number;
  facing: number;
  weapon: Weapon;

  constructor(
    canvas: HTMLCanvasElement,
    attackHandler: AttackHandler,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.attack = attackHandler;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;

    this.defaultColor = 'blue'; // Default player color
    this.color = this.defaultColor;
    this.faceColor = 'orange';

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;
    this.stunColor = 'green'; // Color to indicate player stun

    this.speed = 5;
    this.diagonalSpeed = Math.cos(Math.PI / 4) * this.speed;
    this.facing = FacingAngles.Bottom;

    this.weapon = WeaponList.broadsword(this.canvas);
  }

  getHealth() {
    return this.health;
  }

  takeDamage(amount: number, stun?: boolean) {
    this.health -= amount;
    if (stun) {
      this.stun();
    }
  }

  private stun() {
    this.isStunned = true;
    this.stunTimer = Date.now();
  }

  private updateStun() {
    const elapsed = Date.now() - this.stunTimer;
    if (elapsed >= this.stunDuration) {
      this.isStunned = false;
      this.color = this.defaultColor;
    } else {
      // Set the player color
      this.color = this.stunColor;
    }
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.facing);

    this.context.fillStyle = this.color;
    this.context.fillRect(
      (-1 * this.width) / 2,
      (-1 * this.height) / 2,
      this.width,
      this.height
    );

    this.context.fillStyle = this.faceColor;
    this.context.fillRect(
      (-1 * this.width) / 2,
      this.height / 2 - 2,
      this.width,
      2
    );

    if (this.attack.isAttacking) {
      const weaponRotation =
        (this.weapon.swingAngle * (Date.now() - this.attack.attackTimer)) /
        this.weapon.attackDuration;
      this.weapon.draw(weaponRotation, this.width / 2);
    }

    this.context.restore();
  }

  update(enemies: Array<Enemy>) {
    if (this.isStunned) {
      this.updateStun();
    }
    if (this.attack.isAttacking) {
      this.attack.update(this, enemies);
    }
  }
}
