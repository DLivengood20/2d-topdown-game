import { ScreenElement } from './screenElement';

/**
 * Represents a game screen in the application.
 * @interface
 */
export interface GameScreen {
  /**
   * Indicates whether the game screen is currently active.
   * @type {boolean}
   */
  isActive: boolean;

  /**
   * Retrieves an array of screen elements associated with the game screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[];

  /**
   * Renders the game screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void;
}
