import { CanvasValues } from '../constants';
import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents a game menu screen implementing the GameScreen interface.
 */
export class GameMenuScreen implements GameScreen {
  /**
   * Indicates whether the game menu screen is currently active.
   */
  isActive: boolean = false;
  /**
   * Indicates whether the game menu screen is currently displayed.
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close menu button.
   */
  closeMenuButton: ScreenElement;

  /**
   * The screen element representing the load game button.
   */
  loadGameButton: ScreenElement;

  /**
   * Creates a new GameMenuScreen instance.
   */
  constructor() {
    this.closeMenuButton = ScreenElements.Button_1;
    this.loadGameButton = ScreenElements.Button_2;
  }

  /**
   * Gets an array of screen elements associated with the game menu screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeMenuButton, this.loadGameButton];
  }

  /**
   * Renders the game menu screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderGameMenuScreen(
      ctx,
      this.closeMenuButton,
      this.loadGameButton
    );
  }

  /**
   * Closes or shuts down the current screen by updating its state properties.
   *
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.loadGameButton.isHovered = false;
  }
}
