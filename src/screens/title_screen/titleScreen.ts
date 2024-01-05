import { GameScreen } from '../gameScreen';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { renderTitleScreen } from './titleRenderer';

/**
 * Represents the title screen in the game.
 * @implements {GameScreen}
 */
export class TitleScreen implements GameScreen {
  /**
   * Indicates whether the title screen is currently active.
   * @type {boolean}
   * @default true
   */
  isActive: boolean = true;

  /**
   * Indicates whether the title screen is currently displayed.
   * @type {boolean}
   * @default true
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
    renderTitleScreen(
      ctx,
      this.startButton,
      this.loadGameButton,
      this.settingsButton,
      this.quitButton
    );
  }

  /**
   * Closes or deactivates the title screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.loadGameButton.isHovered = false;
  }

  /**
   * Opens or activates the title screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.startButton.isHovered = false;
    this.loadGameButton.isHovered = false;
    this.settingsButton.isHovered = false;
    this.quitButton.isHovered = false;
  }
}
