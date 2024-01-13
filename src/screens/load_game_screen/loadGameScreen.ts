import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleLoadGameScreenInput } from './loadGameInput';
import { renderLoadGameScreen } from './loadGameRenderer';

/**
 * Represents the load game screen in the game.
 * @implements {GameScreen}
 */
export class LoadGameScreen implements GameScreen {
  /**
   * The name of the load game screen.
   * @readonly
   */
  readonly name: string = 'load';

  /**
   * Indicates whether the load game screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close load game button.
   * @type {ScreenElement}
   */
  closeLoadGameButton: ScreenElement;

  /**
   * Creates a new LoadGameScreen instance.
   */
  constructor() {
    this.closeLoadGameButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the load game screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeLoadGameButton];
  }

  /**
   * Renders the load game screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderLoadGameScreen(ctx, this.closeLoadGameButton);
  }

  /**
   * Closes or shuts down the load game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the load game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isDisplayed = true;
    this.closeLoadGameButton.isHovered = false;
  }

  /**
   * Handles user input on the LoadGameScreen.
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
    handleLoadGameScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
