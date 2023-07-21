import { Collidable } from './collidable';
import { Movement } from './movement';

export class PhysObject {
  x: number;
  y: number;
  heading: number;
  width: number;
  height: number;
  collidable: Collidable;
  move: Movement;

  constructor(
    x: number,
    y: number,
    heading: number,
    width: number,
    height: number,
    speed: number
  ) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.width = width;
    this.height = height;
    this.collidable = new Collidable();
    this.move = new Movement(speed);
  }
}
