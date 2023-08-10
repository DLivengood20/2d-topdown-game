import { Character } from './character';
import { FacingAngles } from './facingAngles';
import { PhysObject } from './physObject';
import { Weapon } from './weapon';
import { WeaponList } from './weaponList';

export class Player implements Character {
  private ctx: CanvasRenderingContext2D | null;
  body: PhysObject;
  isAttacking: boolean;
  attackTimer: number;
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
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.ctx = ctx;
    this.body = new PhysObject(x, y, FacingAngles.Bottom, width, height, 5);
    this.isAttacking = false;
    this.attackTimer = 0;
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

  startAttackTimer() {
    this.isAttacking = true;
    this.attackTimer = Date.now();
    setTimeout(() => (this.isAttacking = false), this.weapon.attackDuration);
  }

  draw() {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }
    this.ctx.save();
    this.ctx.translate(this.body.x, this.body.y);
    this.ctx.rotate(this.body.heading);

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      (-1 * this.body.width) / 2,
      (-1 * this.body.height) / 2,
      this.body.width,
      this.body.height
    );

    this.ctx.fillStyle = this.faceColor;
    this.ctx.fillRect(
      (-1 * this.body.width) / 2,
      this.body.height / 2 - 2,
      this.body.width,
      2
    );

    if (this.isAttacking) {
      const weaponRotation =
        (this.weapon.swingAngle * (Date.now() - this.attackTimer)) /
        this.weapon.attackDuration;
      this.weapon.draw(weaponRotation, this.body.width / 2);
    }

    this.ctx.restore();
  }

  update() {
    if (this.isStunned) {
      this.updateStun();
    }
  }
}
