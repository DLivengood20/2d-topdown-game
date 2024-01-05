import { GameScreen } from '../gameScreen';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { renderGameMenuScreen } from './gameMenuRenderer';

/**
 * Represents a game menu screen implementing the GameScreen interface.
 * @implements {GameScreen}
 */
export class GameMenuScreen implements GameScreen {
  /**
   * Indicates whether the game menu screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;
  /**
   * Indicates whether the game menu screen is currently displayed.
   * @type {boolean}
   * @default false
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
   * The screen element representing the save game button.
   */
  saveGameButton: ScreenElement;

  /**
   * The screen element representing the settings button.
   */
  settingsButton: ScreenElement;

  /**
   * The screen element representing the quit to title button.
   */
  openTitleButton: ScreenElement;

  /**
   * The screen element representing the exit program button.
   */
  quitGameButton: ScreenElement;

  /**
   * Creates a new GameMenuScreen instance.
   */
  constructor() {
    this.closeMenuButton = ScreenElements.Button_1;
    this.saveGameButton = ScreenElements.Button_2;
    this.loadGameButton = ScreenElements.Button_3;
    this.settingsButton = ScreenElements.Button_4;
    this.openTitleButton = ScreenElements.Button_5;
    this.quitGameButton = ScreenElements.Button_6;
  }

  /**
   * Gets an array of screen elements associated with the game menu screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [
      this.closeMenuButton,
      this.loadGameButton,
      this.settingsButton,
      this.saveGameButton,
      this.openTitleButton,
      this.quitGameButton,
    ];
  }

  /**
   * Renders the game menu screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderGameMenuScreen(
      ctx,
      this.closeMenuButton,
      this.saveGameButton,
      this.loadGameButton,
      this.settingsButton,
      this.openTitleButton,
      this.quitGameButton
    );
  }

  /**
   * Closes or shuts down the game menu screen by updating its state properties.
   *
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.closeMenuButton.isHovered = false;
    this.saveGameButton.isHovered = false;
    this.loadGameButton.isHovered = false;
    this.settingsButton.isHovered = false;
    this.openTitleButton.isHovered = false;
    this.quitGameButton.isHovered = false;
  }

  /**
   * Opens or activates the game menu screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.closeMenuButton.isHovered = false;
    this.saveGameButton.isHovered = false;
    this.loadGameButton.isHovered = false;
    this.settingsButton.isHovered = false;
    this.openTitleButton.isHovered = false;
    this.quitGameButton.isHovered = false;
  }
}
