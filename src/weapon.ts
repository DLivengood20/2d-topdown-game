export class Weapon {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  length: number;
  width: number;
  swingAngle: number;
  attackDuration: number;
  cooldown: number;

  constructor(
    canvas: HTMLCanvasElement,
    length: number,
    width: number,
    swingAngle: number,
    attackDuration: number,
    cooldown: number
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.length = length;
    this.width = width;
    this.swingAngle = swingAngle;
    this.attackDuration = attackDuration; // in milliseconds
    this.cooldown = cooldown; // in milliseconds
  }

  draw(rotate: number, distanceFromUser: number) {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.rotate(this.swingAngle / 2 - rotate);
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
