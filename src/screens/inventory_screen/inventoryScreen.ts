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
   * Indicates whether the inventory screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

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
   * Closes or shuts down the inventory screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the inventory screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isDisplayed = true;
    this.closeInventoryButton.isHovered = false;
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
