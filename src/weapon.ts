export class Weapon {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  length: number;
  width: number;
  attackDuration: number;
  cooldown: number;

  constructor(canvas: HTMLCanvasElement, length: number, width: number) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.length = length;
    this.width = width;
    this.attackDuration = 200; // in milliseconds
    this.cooldown = 500; // in milliseconds
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.fillStyle = 'black';
    this.context.fillRect((-1 * this.width) / 2, 0, this.width, this.length);
  }
}
