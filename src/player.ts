import { AttackHandler } from './attackHandler';
import { Enemy } from './enemy';
import { FacingAngles } from './facingAngles';
import { Moveable } from './moveable';
import { Weapon } from './weapon';
import { WeaponList } from './weaponList';

export class Player {
  private ctx: CanvasRenderingContext2D | null;
  private attack: AttackHandler;
  move: Moveable;
  private health: number;
  private color: string;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  private stunColor: string;
  private defaultColor: string;
  private faceColor: string;
  weapon: Weapon;

  constructor(
    ctx: CanvasRenderingContext2D,
    attackHandler: AttackHandler,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.ctx = ctx;
    this.attack = attackHandler;
    this.move = new Moveable(x, y, width, height, 5, FacingAngles.Bottom);
    this.health = health;

    this.defaultColor = 'blue'; // Default player color
    this.color = this.defaultColor;
    this.faceColor = 'orange';

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;
    this.stunColor = 'green'; // Color to indicate player stun

    this.weapon = WeaponList.broadsword(this.ctx);
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
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.ctx.save();
    this.ctx.translate(this.move.x, this.move.y);
    this.ctx.rotate(this.move.heading);

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      (-1 * this.move.width) / 2,
      (-1 * this.move.height) / 2,
      this.move.width,
      this.move.height
    );

    this.ctx.fillStyle = this.faceColor;
    this.ctx.fillRect(
      (-1 * this.move.width) / 2,
      this.move.height / 2 - 2,
      this.move.width,
      2
    );

    if (this.attack.isAttacking) {
      const weaponRotation =
        (this.weapon.swingAngle * (Date.now() - this.attack.attackTimer)) /
        this.weapon.attackDuration;
      this.weapon.draw(weaponRotation, this.move.width / 2);
    }

    this.ctx.restore();
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
