import { Character } from './character';
import { FacingAngles } from './facingAngles';
import { PhysObject } from './physObject';
import { Weapon } from './weapon';
import { WeaponList } from './weaponList';

export class Player implements Character {
  body: PhysObject;
  isAttacking: boolean;
  attackTimer: number;
  private health: number;
  color: string;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  private stunColor: string;
  private defaultColor: string;
  faceColor: string;
  weapon: Weapon;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
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

    this.weapon = WeaponList.broadsword();
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

  update() {
    if (this.isStunned) {
      this.updateStun();
    }
  }
}
