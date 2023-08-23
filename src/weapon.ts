export class Weapon {
  length: number;
  width: number;
  swingAngle: number;
  attackDuration: number;
  cooldown: number;

  constructor(
    length: number,
    width: number,
    swingAngle: number,
    attackDuration: number,
    cooldown: number
  ) {
    this.length = length;
    this.width = width;
    this.swingAngle = swingAngle;
    this.attackDuration = attackDuration; // in milliseconds
    this.cooldown = cooldown; // in milliseconds
  }
}
