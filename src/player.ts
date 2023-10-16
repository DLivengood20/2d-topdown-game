import { Character } from './character';
import { FacingAngles, Weapons } from './constants';
import { PhysObject } from './physObject';
import { RenderComponent } from './render.component';
import { Weapon } from './weapon';

export class Player implements Character {
  renderComponent: RenderComponent;
  body: PhysObject;
  isAttacking: boolean;
  attackTimer: number;
  private health: number;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  weapon: Weapon;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.renderComponent = new RenderComponent('blue', 'orange', 'green');
    this.body = new PhysObject(x, y, FacingAngles.BOTTOM, width, height, 5);
    this.isAttacking = false;
    this.attackTimer = 0;
    this.health = health;

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;

    this.weapon = Weapons.BROADSWORD;
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
    let { currentColor, defaultColor, stunColor } = this.renderComponent;
    if (elapsed >= this.stunDuration) {
      this.isStunned = false;
      currentColor = defaultColor;
    } else {
      // Set the player color
      currentColor = stunColor;
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
