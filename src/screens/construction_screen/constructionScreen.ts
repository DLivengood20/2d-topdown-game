import { RenderUtility } from '../../renderUtility';
import { GameScreen } from '../gameScreen';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';

/**
 * Represents the construction screen in the game.
 * @implements {GameScreen}
 */
export class ConstructionScreen implements GameScreen {
  /**
   * Indicates whether the construction screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;

  /**
   * Indicates whether the construction screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close construction button.
   * @type {ScreenElement}
   */
  closeConstructionButton: ScreenElement;

  /**
   * Creates a new ConstructionScreen instance.
   */
  constructor() {
    this.closeConstructionButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the construction screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeConstructionButton];
  }

  /**
   * Renders the construction screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderConstructionScreen(ctx, this.closeConstructionButton);
  }

  /**
   * Closes or shuts down the construction screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.closeConstructionButton.isHovered = false;
  }

  /**
   * Opens or activates the construction screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.closeConstructionButton.isHovered = false;
  }
}
