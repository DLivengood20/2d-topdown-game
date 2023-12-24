import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the starting screen in the game.
 * @implements {GameScreen}
 */
export class StartScreen implements GameScreen {
  /**
   * Indicates whether the start screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = true;

  /**
   * Indicates whether the start screen is currently displayed.
   * @type {boolean}
   */
  isDisplayed: boolean = true;

  /**
   * The screen element representing the start button.
   * @type {ScreenElement}
   */
  startButton: ScreenElement;

  /**
   * The screen element representing the load game button.
   * @type {ScreenElement}
   */
  loadGameButton: ScreenElement;

  /**
   * The screen element representing the quit button.
   * @type {ScreenElement}
   */
  quitButton: ScreenElement;

  /**
   * Creates a new StartScreen instance.
   */
  constructor() {
    this.startButton = ScreenElements.startButton;
    this.loadGameButton = ScreenElements.loadGameButton;
    this.quitButton = ScreenElements.quitButton;
  }

  /**
   * Gets an array of screen elements associated with the start screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.startButton, this.loadGameButton, this.quitButton];
  }

  /**
   * Renders the start screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderStartScreen(
      ctx,
      this.startButton,
      this.loadGameButton,
      this.quitButton
    );
  }
}
