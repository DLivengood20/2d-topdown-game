/**
 * Represents a screen element with position and dimensions.
 * @class
 */
export class ScreenElement {
  /**
   * The x-coordinate of the screen element.
   * @readonly
   * @type {number}
   */
  readonly x: number;

  /**
   * The y-coordinate of the screen element.
   * @readonly
   * @type {number}
   */
  readonly y: number;

  /**
   * The width of the screen element.
   * @readonly
   * @type {number}
   */
  readonly width: number;

  /**
   * The height of the screen element.
   * @readonly
   * @type {number}
   */
  readonly height: number;

  /**
   * Indicates whether the mouse is hovering over the screen element.
   * @type {boolean}
   */
  isHovered: boolean = false;

  /**
   * Creates a new screen element with the specified position and dimensions.
   * @constructor
   * @param {number} x - The x-coordinate of the screen element.
   * @param {number} y - The y-coordinate of the screen element.
   * @param {number} width - The width of the screen element.
   * @param {number} height - The height of the screen element.
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Checks if the mouse is hovering over the screen element.
   * @param {number} mouseX - The x-coordinate of the mouse.
   * @param {number} mouseY - The y-coordinate of the mouse.
   * @returns {boolean} True if the mouse is hovering over the screen element, otherwise false.
   */
  checkMouseHover(mouseX: number, mouseY: number): boolean {
    this.isHovered =
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height;
    return this.isHovered;
  }
}
