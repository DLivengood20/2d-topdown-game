import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents a game settings screen implementing the GameScreen interface.
 */
export class SettingsScreen implements GameScreen {
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
   * Creates a new SettingsScreen instance.
   */
  constructor() {
    this.closeMenuButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the settings screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeMenuButton];
  }

  /**
   * Renders the settings screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderSettingsScreen(ctx, this.closeMenuButton);
  }

  /**
   * Closes or shuts down the settings screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }
}
