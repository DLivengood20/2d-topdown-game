import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleCraftingScreenInput } from './craftingMenuInput';
import { renderCraftingMenuScreen } from './craftingMenuRenderer';

/**
 * Represents the crafting menu screen in the game.
 * @implements {GameScreen}
 */
export class CraftingMenuScreen implements GameScreen {
  /**
   * The name of the crafting menu screen.
   * @readonly
   */
  readonly name: string = 'crafting';

  /**
   * The screen element representing the close crafting menu button.
   * @type {ScreenElement}
   */
  closeCraftingMenuButton: ScreenElement;

  /**
   * The screen element representing the open item world button.
   * @type {ScreenElement}
   */
  openItemWorldButton: ScreenElement;

  /**
   * Creates a new CraftingMenuScreen instance.
   */
  constructor() {
    this.closeCraftingMenuButton = ScreenElements.Button_1;
    this.openItemWorldButton = ScreenElements.Button_2;
  }

  /**
   * Gets an array of screen elements associated with the crafting menu screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeCraftingMenuButton, this.openItemWorldButton];
  }

  /**
   * Renders the crafting menu screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderCraftingMenuScreen(
      ctx,
      this.closeCraftingMenuButton,
      this.openItemWorldButton
    );
  }

  /**
   * Handles user input on the CraftingMenuScreen.
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
    handleCraftingScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
