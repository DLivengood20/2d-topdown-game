import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleGameShopScreenInput } from './gameShopInput';
import { renderGameShopScreen } from './gameShopRenderer';

/**
 * Represents the game shop screen in the game.
 * @implements {GameScreen}
 */
export class GameShopScreen implements GameScreen {
  /**
   * The name of the game shop screen.
   * @readonly
   */
  readonly name: string = 'shop';

  /**
   * The screen element representing the close game shop button.
   * @type {ScreenElement}
   */
  closeGameShopButton: ScreenElement;

  /**
   * Creates a new GameShopScreen instance.
   */
  constructor() {
    this.closeGameShopButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the game shop screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeGameShopButton];
  }

  /**
   * Renders the game shop screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderGameShopScreen(ctx, this.closeGameShopButton);
  }

  /**
   * Handles user input on the GameShopScreen.
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
    handleGameShopScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
