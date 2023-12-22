/**
 * Represents the coordinates of the mouse position.
 * @class
 */
class MousePosition {
  /**
   * The x-coordinate of the mouse position.
   * @type {number}
   */
  x: number;

  /**
   * The y-coordinate of the mouse position.
   * @type {number}
   */
  y: number;

  /**
   * Creates a new instance of the MousePosition class with the specified coordinates.
   * @constructor
   * @param {number} x - The x-coordinate of the mouse position.
   * @param {number} y - The y-coordinate of the mouse position.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class InputService {
  /** Stores the keys currently pressed. */
  keysPressed: { [key: string]: boolean } = {};
  /** Stores current mouse position */
  mousePosition: MousePosition = new MousePosition(0, 0);
  /**
   * Constructs the InputService and sets up event listeners for keyboard and mouse input.
   */
  constructor() {
    this.addEventListeners();
  }

  /**
   * Adds event listeners for keyboard and mouse input.
   * @private
   */
  private addEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  /**
   * Handles the keydown event and updates the keysPressed object.
   * @param {KeyboardEvent} event - The keydown event.
   * @private
   */
  private handleKeyDown(event: KeyboardEvent): void {
    this.keysPressed[event.key] = true;
  }

  /**
   * Handles the keyup event and updates the keysPressed object.
   * @param {KeyboardEvent} event - The keyup event.
   * @private
   */
  private handleKeyUp(event: KeyboardEvent): void {
    this.keysPressed[event.key] = false;
  }

  /**
   * Handles the mousedown event and sets the mousedown flag to true.
   * @param {MouseEvent} event - The mousedown event.
   * @private
   */
  private handleMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = true;
    }
  }

  /**
   * Handles the mouseup event and sets the mousedown flag to false.
   * @param {MouseEvent} event - The mouseup event.
   * @private
   */
  private handleMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = false;
    }
  }

  /**
   * Handles the 'mousemove' event and updates the mouse position accordingly.
   * @private
   * @param {MouseEvent} event - The 'mousemove' event object.
   */
  private handleMouseMove(event: MouseEvent): void {
    /**
     * Check if the event type is 'mousemove' and update the mouse position.
     */
    if (event.type === 'mousemove') {
      /**
       * The new mouse position.
       * @type {MousePosition}
       */
      this.mousePosition = new MousePosition(event.offsetX, event.offsetY);
    }
  }
}
