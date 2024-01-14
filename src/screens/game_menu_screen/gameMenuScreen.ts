import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleGameMenuScreenInput } from './gameMenuInput';
import { renderGameMenuScreen } from './gameMenuRenderer';

/**
 * Represents a game menu screen implementing the GameScreen interface.
 * @implements {GameScreen}
 */
export class GameMenuScreen implements GameScreen {
  /**
   * The name of the game menu screen.
   * @readonly
   */
  readonly name: string = 'game-menu';

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
   * Resets the game menu screen elements to default
   * @returns {this}
   */
  reset(): this {
    this.getElements().forEach((element) => {
      element.isHovered = false;
    });
    return this;
  }

  /**
   * Handles user input on the GameMenuScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
   * @returns {void}
   * @public
   */
  handleInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager,
    screenKeyController: ScreenKeyController
  ): void {
    handleGameMenuScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
