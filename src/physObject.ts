export class PhysObject {
  x: number;
  y: number;
  heading: number;
  width: number;
  height: number;
  speed: number;
  diagonalSpeed: number;

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
    this.speed = speed;
    this.diagonalSpeed = Math.cos(Math.PI / 4) * speed;
  }
}
