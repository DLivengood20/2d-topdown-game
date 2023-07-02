export class Player {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  color: string;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number,
    color: string
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.color = color;
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.fillStyle = 'blue';
    this.context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
