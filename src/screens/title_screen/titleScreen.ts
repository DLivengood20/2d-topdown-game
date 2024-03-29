import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleTitleScreenInput } from './titleInput';
import { renderTitleScreen } from './titleRenderer';

/**
 * Represents the title screen in the game.
 * @implements {GameScreen}
 */
export class TitleScreen implements GameScreen {
  /**
   * The name of the title screen.
   * @readonly
   */
  readonly name: string = 'title';

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
   * Resets the title screen elements to default
   * @returns {this}
   */
  reset(): this {
    this.getElements().forEach((element) => {
      element.isHovered = false;
    });
    return this;
  }

  /**
   * Handles user input on the TitleScreen.
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
    handleTitleScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
