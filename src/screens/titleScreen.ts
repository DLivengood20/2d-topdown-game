import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the title screen in the game.
 * @implements {GameScreen}
 */
export class TitleScreen implements GameScreen {
  /**
   * Indicates whether the title screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = true;

  /**
   * Indicates whether the title screen is currently displayed.
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
   * The screen element representing the game settings button.
   * @type {ScreenElement}
   */
  settingsButton: ScreenElement;

  /**
   * The screen element representing the quit button.
   * @type {ScreenElement}
   */
  quitButton: ScreenElement;

  /**
   * Creates a new TitleScreen instance.
   */
  constructor() {
    this.startButton = ScreenElements.Button_1;
    this.loadGameButton = ScreenElements.Button_2;
    this.settingsButton = ScreenElements.Button_3;
    this.quitButton = ScreenElements.Button_4;
  }

  /**
   * Gets an array of screen elements associated with the title screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [
      this.startButton,
      this.loadGameButton,
      this.settingsButton,
      this.quitButton,
    ];
  }

  /**
   * Renders the title screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderTitleScreen(
      ctx,
      this.startButton,
      this.loadGameButton,
      this.settingsButton,
      this.quitButton
    );
  }

  /**
   * Closes or shuts down the title screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.loadGameButton.isHovered = false;
  }
}
