import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleSaveGameScreenInput } from './saveGameInput';
import { renderSaveGameScreen } from './saveGameRenderer';

/**
 * Represents the save game screen in the game.
 * @implements {GameScreen}
 */
export class SaveGameScreen implements GameScreen {
  /**
   * The name of the save game screen.
   * @readonly
   */
  readonly name: string = 'save';

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
    renderSaveGameScreen(ctx, this.closeSaveGameButton);
  }

  /**
   * Closes or deactivates the save game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the save game screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isDisplayed = true;
    this.closeSaveGameButton.isHovered = false;
  }

  /**
   * Handles user input on the SaveGameScreen.
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
    handleSaveGameScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
