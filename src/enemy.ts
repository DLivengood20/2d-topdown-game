import { Character } from './character';
import { PhysObject } from './physObject';

export class Enemy implements Character {
  private ctx: CanvasRenderingContext2D | null;
  body: PhysObject;
  isAttacking: boolean;
  attackTimer: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    heading: number,
    speed: number
  ) {
    this.ctx = ctx;
    this.body = new PhysObject(x, y, heading, width, height, speed);
    this.isAttacking = false;
    this.attackTimer = 0;
  }

  draw() {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.body.x - this.body.width / 2,
      this.body.y - this.body.height / 2,
      this.body.width,
      this.body.height
    );
  }
}
