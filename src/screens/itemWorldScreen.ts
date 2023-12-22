import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';

/**
 * Represents a screen for the item world in the game.
 * @implements {GameScreen}
 */
export class ItemWorldScreen implements GameScreen {
  /**
   * Indicates whether the item world screen is currently active.
   */
  isActive: boolean = true;

  /**
   * Gets an array of screen elements for the item world.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [];
  }

  /**
   * Renders the item world screen on the canvas.
   * If the screen has no specific rendering logic, this method does nothing.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    // Implement rendering for ItemWorldScreen
  }
}
