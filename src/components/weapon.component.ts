import { Component } from './component';

/**
 * Represents the weapon properties of an entity in the game.
 * @implements {Component}
 */
export class WeaponComponent implements Component {
  /**
   * The length of the weapon.
   * @type {number}
   */
  length: number;

  /**
   * The width of the weapon.
   * @type {number}
   */
  width: number;

  /**
   * The swing angle of the weapon in radians.
   * @type {number}
   */
  swingAngle: number;

  /**
   * The duration of the attack action in milliseconds.
   * @type {number}
   */
  attackDuration: number;

  /**
   * The cooldown time between consecutive attacks in milliseconds.
   * @type {number}
   */
  cooldown: number;

  /**
   * The color of the weapon.
   * @type {string}
   */
  color: string;

  /**
   * Creates an instance of WeaponComponent.
   * @param {number} length - The length of the weapon.
   * @param {number} width - The width of the weapon.
   * @param {number} swingAngle - The swing angle of the weapon in radians.
   * @param {number} attackDuration - The duration of the attack action in milliseconds.
   * @param {number} cooldown - The cooldown time between consecutive attacks in milliseconds.
   * @param {string} color - The color of the weapon.
   */
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
    this.attackDuration = attackDuration;
    this.cooldown = cooldown;
    this.color = color;
  }
}
