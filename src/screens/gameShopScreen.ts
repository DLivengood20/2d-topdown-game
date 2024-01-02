import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the game shop screen in the game.
 * @implements {GameScreen}
 */
export class GameShopScreen implements GameScreen {
  /**
   * Indicates whether the game shop screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;

  /**
   * Indicates whether the game shop screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close game shop button.
   * @type {ScreenElement}
   */
  closeGameShopButton: ScreenElement;

  /**
   * Creates a new GameShopScreen instance.
   */
  constructor() {
    this.closeGameShopButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the game shop screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeGameShopButton];
  }

  /**
   * Renders the game shop screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderGameShopScreen(ctx, this.closeGameShopButton);
  }

  /**
   * Closes or shuts down the game shop screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the game shop screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.closeGameShopButton.isHovered = false;
  }
}
