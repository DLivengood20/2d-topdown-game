import { Character } from './character';
import { PhysObject } from './physObject';
import { RenderComponent } from './render.component';

export class Enemy implements Character {
  renderComponent: RenderComponent;
  body: PhysObject;
  isAttacking: boolean;
  attackTimer: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    heading: number,
    speed: number
  ) {
    this.renderComponent = new RenderComponent('red', 'green', 'blue');
    this.body = new PhysObject(x, y, heading, width, height, speed);
    this.isAttacking = false;
    this.attackTimer = 0;
  }

  startAttackTimer(): void {
    return;
  }
}
