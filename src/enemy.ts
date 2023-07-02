export class Enemy {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.fillStyle = 'red';
    this.context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  checkCollision(
    playerX: number,
    playerY: number,
    playerWidth: number,
    playerHeight: number
  ) {
    return (
      this.x < playerX + playerWidth &&
      this.x + this.width > playerX &&
      this.y < playerY + playerHeight &&
      this.y + this.height > playerY
    );
  }
}
