import { RenderUtility } from '../../renderUtility';
import { GameScreen } from '../gameScreen';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';

/**
 * Represents a game settings screen implementing the GameScreen interface.
 * @implements {GameScreen}
 */
export class SettingsScreen implements GameScreen {
  /**
   * Indicates whether the settings screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;

  /**
   * Indicates whether the settings screen is currently displayed.
   * @type {boolean}
   * @default false
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
   * @param {CanvasRenderingContext2D} ctx - The rendering context for the canvas.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderSettingsScreen(ctx, this.closeMenuButton);
  }

  /**
   * Closes or deactivates the settings screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the settings screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.closeMenuButton.isHovered = false;
  }
}
