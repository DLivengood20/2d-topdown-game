import { Entity } from '../../entities/entity';
import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { handleItemWorldScreenInput } from './itemWorldInput';
import { renderItemWorldScreen } from './itemWorldRenderer';

/**
 * Represents a screen for the item world in the game.
 * @implements {GameScreen}
 */
export class ItemWorldScreen implements GameScreen {
  /**
   * The name of the item world screen.
   * @readonly
   */
  readonly name: string = 'item-world';

  /**
   * Indicates whether the item world screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * Creates a new ItemWorldScreen instance.
   */
  constructor() {}

  /**
   * Gets an array of screen elements for the item world.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [];
  }

  /**
   * Renders the item world screen on the canvas.
   * If the screen has no specific rendering logic, this method does nothing.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @param {Entity[]} entities - An array of entities relevant to the item world screen.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D, entities: Entity[]): void {
    renderItemWorldScreen(ctx, entities);
  }

  /**
   * Closes or shuts down the item world screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the item world screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isDisplayed = true;
  }

  /**
   * Handles user input on the ItemWorldScreen.
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
    handleItemWorldScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
