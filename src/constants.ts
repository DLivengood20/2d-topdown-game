/**
 * Enum representing canvas dimensions.
 *
 * @enum {number}
 */
export enum CanvasValues {
  /**
   * The width of the canvas.
   * @type {number}
   */
  WIDTH = 800,

  /**
   * The height of the canvas.
   * @type {number}
   */
  HEIGHT = 600,
}

/**
 * Enum representing facing angles in radians.
 *
 * @enum {number}
 */
export enum Directions {
  /**
   * The facing angle pointing towards the top direction.
   * @type {number}
   */
  TOP = Math.PI,

  /**
   * The facing angle pointing towards the bottom direction.
   * @type {number}
   */
  BOTTOM = 0,

  /**
   * The facing angle pointing towards the left direction.
   * @type {number}
   */
  LEFT = (90 * Math.PI) / 180,

  /**
   * The facing angle pointing towards the right direction.
   * @type {number}
   */
  RIGHT = (270 * Math.PI) / 180,

  /**
   * The facing angle pointing towards the top-left direction.
   * @type {number}
   */
  TOP_LEFT = (135 * Math.PI) / 180,

  /**
   * The facing angle pointing towards the top-right direction.
   * @type {number}
   */
  TOP_RIGHT = (225 * Math.PI) / 180,

  /**
   * The facing angle pointing towards the bottom-left direction.
   * @type {number}
   */
  BOTTOM_LEFT = (45 * Math.PI) / 180,

  /**
   * The facing angle pointing towards the bottom-right direction.
   * @type {number}
   */
  BOTTOM_RIGHT = (315 * Math.PI) / 180,
}
