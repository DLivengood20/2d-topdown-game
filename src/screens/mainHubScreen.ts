import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the main hub screen in the game.
 * @implements {GameScreen}
 */
export class MainHubScreen implements GameScreen {
  /**
   * Indicates whether the main hub screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = false;

  /**
   * Indicates whether the main hub screen is currently displayed.
   * @type {boolean}
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close main hub button.
   * @type {ScreenElement}
   */
  closeMainHubButton: ScreenElement;

  /**
   * Creates a new MainHubScreen instance.
   */
  constructor() {
    this.closeMainHubButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the main hub screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeMainHubButton];
  }

  /**
   * Renders the main hub screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderMainHubScreen(ctx, this.closeMainHubButton);
  }

  /**
   * Closes or shuts down the main hub screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }
}
