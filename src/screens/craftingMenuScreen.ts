import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the crafting menu screen in the game.
 * @implements {GameScreen}
 */
export class CraftingMenuScreen implements GameScreen {
  /**
   * Indicates whether the crafting menu screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = false;

  /**
   * Indicates whether the crafting menu screen is currently displayed.
   * @type {boolean}
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close crafting menu button.
   * @type {ScreenElement}
   */
  closeCraftingMenuButton: ScreenElement;

  /**
   * Creates a new CraftingMenuScreen instance.
   */
  constructor() {
    this.closeCraftingMenuButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the crafting menu screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeCraftingMenuButton];
  }

  /**
   * Renders the crafting menu screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderCraftingMenuScreen(ctx, this.closeCraftingMenuButton);
  }

  /**
   * Closes or shuts down the crafting menu screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }
}
