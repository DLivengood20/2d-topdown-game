import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the inventory screen in the game.
 * @implements {GameScreen}
 */
export class InventoryScreen implements GameScreen {
  /**
   * Indicates whether the inventory screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = false;

  /**
   * Indicates whether the inventory screen is currently displayed.
   * @type {boolean}
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close inventory button.
   * @type {ScreenElement}
   */
  closeInventoryButton: ScreenElement;

  /**
   * Creates a new InventoryScreen instance.
   */
  constructor() {
    this.closeInventoryButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the inventory screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeInventoryButton];
  }

  /**
   * Renders the inventory screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderInventoryScreen(ctx, this.closeInventoryButton);
  }

  /**
   * Closes or shuts down the inventory screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }
}
