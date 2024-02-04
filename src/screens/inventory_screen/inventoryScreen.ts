import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleInventoryScreenInput } from './inventoryInput';
import { renderInventoryScreen } from './inventoryRenderer';

/**
 * Represents the inventory screen in the game.
 * @implements {GameScreen}
 */
export class InventoryScreen implements GameScreen {
  /**
   * The name of the inventory screen.
   * @readonly
   */
  readonly name: string = 'inventory';

  /**
   * The screen element representing the close inventory button.
   * @type {ScreenElement}
   */
  closeInventoryButton: ScreenElement;

  /**
   * Creates a new InventoryScreen instance.
   */
  constructor() {
    this.closeInventoryButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the inventory screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeInventoryButton];
  }

  /**
   * Renders the inventory screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderInventoryScreen(ctx, this.closeInventoryButton);
  }

  /**
   * Resets the inventory screen elements to default
   * @returns {this}
   */
  reset(): this {
    this.getElements().forEach((element) => {
      element.isHovered = false;
    });
    return this;
  }

  /**
   * Handles user input on the InventoryScreen.
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
    handleInventoryScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
