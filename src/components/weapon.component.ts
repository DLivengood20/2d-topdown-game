import { Component } from './component';

export class WeaponComponent implements Component {
  length: number;
  width: number;
  swingAngle: number;
  attackDuration: number;
  cooldown: number;
  color: string;

  constructor(
    length: number,
    width: number,
    swingAngle: number,
    attackDuration: number,
    cooldown: number,
    color: string
  ) {
    this.length = length;
    this.width = width;
    this.swingAngle = swingAngle;
    this.attackDuration = attackDuration; // in milliseconds
    this.cooldown = cooldown; // in milliseconds
    this.color = color;
  }
}
