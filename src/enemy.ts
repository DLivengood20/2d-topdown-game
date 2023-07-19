export class Enemy {
  private ctx: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
