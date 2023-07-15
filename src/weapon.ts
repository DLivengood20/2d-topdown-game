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

  draw(rotate: number, distanceFromUser: number) {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.rotate((45 * Math.PI) / 180 - rotate);
    this.context.translate(0, this.width / 2);

    this.context.fillStyle = 'black';
    this.context.fillRect(
      (-1 * this.width) / 2,
      distanceFromUser,
      this.width,
      this.length
    );
  }
}
