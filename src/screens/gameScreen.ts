import { Entity } from '../entities/entity';
import { GameScreensManager } from './gameScreenManager';
import { ScreenKeyController } from './input_services/screenKeyController';
import { ScreenElement } from './screenElement';

/**
 * Represents a game screen in the application.
 * @interface
 */
export interface GameScreen {
  /**
   * The name of the game screen.
   * @readonly
   */
  readonly name: string;

  /**
   * Indicates whether the game screen is currently displayed.
   * @type {boolean}
   */
  isDisplayed: boolean;

  /**
   * Retrieves an array of screen elements associated with the game screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[];

  /**
   * Renders the game screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @param {Entity[]} [entities] - An optional array of entities relevant to the game screen.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D, entities?: Entity[]): void;

  /**
   * Closes or shuts down the current screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void;

  /**
   * Opens or activates the current screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void;

  /**
   * Handles user input for the game screen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed.
   * @param {GameScreensManager} gameScreens - The manager for game screens.
   * @param {ScreenKeyController} screenKeyController - Controller for screen key events.
   * @returns {void}
   */
  handleInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager,
    screenKeyController: ScreenKeyController
  ): void;
}
