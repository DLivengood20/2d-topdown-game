import { PhysObject } from './physObject';

export class Movement {
  speed: number;
  diagonalSpeed: number;

  constructor(speed: number) {
    this.speed = speed;
    this.diagonalSpeed = Math.cos(Math.PI / 4) * speed;
  }

  up(object: PhysObject, speed: number) {
    object.y -= speed;
  }

  down(object: PhysObject, speed: number) {
    object.y += speed;
  }

  left(object: PhysObject, speed: number) {
    object.x -= speed;
  }

  right(object: PhysObject, speed: number) {
    object.x += speed;
  }
}
