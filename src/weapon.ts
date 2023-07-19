export class Weapon {
  private ctx: CanvasRenderingContext2D | null;
  length: number;
  width: number;
  swingAngle: number;
  attackDuration: number;
  cooldown: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    length: number,
    width: number,
    swingAngle: number,
    attackDuration: number,
    cooldown: number
  ) {
    this.ctx = ctx;
    this.length = length;
    this.width = width;
    this.swingAngle = swingAngle;
    this.attackDuration = attackDuration; // in milliseconds
    this.cooldown = cooldown; // in milliseconds
  }

  draw(rotate: number, distanceFromUser: number) {
    if (this.ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.ctx.rotate(this.swingAngle / 2 - rotate);
    this.ctx.translate(0, this.width / 2);

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      (-1 * this.width) / 2,
      distanceFromUser,
      this.width,
      this.length
    );
  }
}
