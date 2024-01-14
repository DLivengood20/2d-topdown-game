import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleMainHubScreenInput } from './mainHubInput';
import { renderMainHubScreen } from './mainHubRenderer';

/**
 * Represents the main hub screen in the game.
 * @implements {GameScreen}
 */
export class MainHubScreen implements GameScreen {
  /**
   * The name of the main hub screen.
   * @readonly
   */
  readonly name: string = 'main-hub';

  /**
   * The screen element representing the open game menu button.
   * @type {ScreenElement}
   */
  openGameMenuButton: ScreenElement;

  /**
   * The screen element representing the open inventory button.
   * @type {ScreenElement}
   */
  openInventoryButton: ScreenElement;

  /**
   * The screen element representing the open crafting menu button.
   * @type {ScreenElement}
   */
  openCraftingMenuButton: ScreenElement;

  /**
   * The screen element representing the open game shop button.
   * @type {ScreenElement}
   */
  openGameShopButton: ScreenElement;

  /**
   * Creates a new MainHubScreen instance.
   */
  constructor() {
    this.openGameMenuButton = ScreenElements.Button_1;
    this.openInventoryButton = ScreenElements.Button_2;
    this.openCraftingMenuButton = ScreenElements.Button_3;
    this.openGameShopButton = ScreenElements.Button_4;
  }

  /**
   * Gets an array of screen elements associated with the main hub screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [
      this.openGameMenuButton,
      this.openInventoryButton,
      this.openCraftingMenuButton,
      this.openGameShopButton,
    ];
  }

  /**
   * Renders the main hub screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderMainHubScreen(
      ctx,
      this.openGameMenuButton,
      this.openInventoryButton,
      this.openCraftingMenuButton,
      this.openGameShopButton
    );
  }

  /**
   * Handles user input on the MainHubScreen.
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
    handleMainHubScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
