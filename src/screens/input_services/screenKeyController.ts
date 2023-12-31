/**
 * Controller for managing user input related to the screen keys.
 *
 * @class
 * @public
 */
export class ScreenKeyController {
  /**
   * Indicates whether the left mouse button is currently pressed.
   * Used to prevent repeated actions when the button is held down.
   * @type {boolean}
   * @private
   */
  private leftMousePressed: boolean;

  /**
   * Indicates whether the Escape key is currently pressed.
   * Used to prevent repeated actions when the key is held down.
   * @type {boolean}
   * @private
   */
  private escapeKeyPressed: boolean;

  /**
   * Creates an instance of ScreenKeyController.
   *
   * @constructor
   * @public
   */
  constructor() {
    this.leftMousePressed = false;
    this.escapeKeyPressed = false;
  }

  /**
   * Sets the state of the left mouse button.
   * @param {boolean} state - The state to set for the left mouse button.
   * @returns {void}
   * @public
   */
  setLeftMousePressed(state: boolean): void {
    this.leftMousePressed = state;
  }

  /**
   * Sets the state of the Escape Key.
   * @param {boolean} state - The state to set for the escape key.
   * @returns {void}
   * @public
   */
  setEscapeKeyPressed(state: boolean): void {
    this.escapeKeyPressed = state;
  }

  /**
   * Checks if a left mouse click has been triggered.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @returns {boolean} True if a left mouse click is triggered, false otherwise.
   * @public
   */
  isLeftClickTriggered(keysPressed: { [key: string]: boolean }): boolean {
    return keysPressed['mousedown'] && !this.leftMousePressed;
  }

  /**
   * Resets the state of the left mouse click if the mouse button is not pressed.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @returns {void}
   * @public
   */
  resetLeftClick(keysPressed: { [key: string]: boolean }): void {
    if (!keysPressed['mousedown']) {
      this.leftMousePressed = false;
    }
  }

  /**
   * Checks if the Escape key has been triggered.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @returns {boolean} True if the Escape key is triggered, false otherwise.
   * @public
   */
  isEscapeKeyTriggered(keysPressed: { [key: string]: boolean }): boolean {
    return keysPressed['Escape'] && !this.escapeKeyPressed;
  }

  /**
   * Resets the state of the Escape key if the key is not pressed.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @returns {void}
   * @public
   */
  resetEscapeKey(keysPressed: { [key: string]: boolean }): void {
    if (!keysPressed['Escape']) {
      this.escapeKeyPressed = false;
    }
  }
}
