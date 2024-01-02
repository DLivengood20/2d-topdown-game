import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the save game screen in the game.
 * @implements {GameScreen}
 */
export class SaveGameScreen implements GameScreen {
  /**
   * Indicates whether the save game screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;

  /**
   * Indicates whether the save game screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close save game button.
   * @type {ScreenElement}
   */
  closeSaveGameButton: ScreenElement;

  /**
   * Creates a new SaveGameScreen instance.
   */
  constructor() {
    this.closeSaveGameButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the save game screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeSaveGameButton];
  }

  /**
   * Renders the save game screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderSaveGameScreen(ctx, this.closeSaveGameButton);
  }

  /**
   * Closes or deactivates the save game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the save game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.closeSaveGameButton.isHovered = false;
  }
}
