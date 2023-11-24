import { Component } from './component';

/**
 * Represents the physical properties of an entity in the game.
 * @implements {Component}
 */
export class PhysicalComponent implements Component {
  /**
   * The x-coordinate of the entity's position.
   * @type {number}
   */
  x: number;
  /**
   * The y-coordinate of the entity's position.
   * @type {number}
   */
  y: number;
  /**
   * The heading or orientation of the entity in radians.
   * @type {number}
   */
  heading: number;
  /**
   * The width of the entity's bounding box.
   * @type {number}
   */
  width: number;
  /**
   * The height of the entity's bounding box.
   * @type {number}
   */
  height: number;
  /**
   * The speed of the entity when moving straight.
   * @type {number}
   */
  speed: number;
  /**
   * The speed of the entity when moving diagonally.
   * @type {number}
   */
  diagonalSpeed: number;

  /**
   * Creates an instance of PhysicalComponent.
   * @param {number} x - The x-coordinate of the entity's initial position.
   * @param {number} y - The y-coordinate of the entity's initial position.
   * @param {number} heading - The initial heading or orientation of the entity in radians.
   * @param {number} width - The width of the entity's bounding box.
   * @param {number} height - The height of the entity's bounding box.
   * @param {number} speed - The speed of the entity when moving.
   */
  constructor(
    x: number,
    y: number,
    heading: number,
    width: number,
    height: number,
    speed: number
  ) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.diagonalSpeed = Math.cos(Math.PI / 4) * speed;
  }
}
