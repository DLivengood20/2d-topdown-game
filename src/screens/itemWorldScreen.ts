import { Entity } from '../entities/entity';
import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';

/**
 * Represents a screen for the item world in the game.
 * @implements {GameScreen}
 */
export class ItemWorldScreen implements GameScreen {
  /**
   * Indicates whether the item world screen is currently active.
   * @type {boolean}
   */
  isActive: boolean = false;

  /**
   * Indicates whether the item world screen is currently displayed.
   * @type {boolean}
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
    RenderUtility.renderItemWorldScreen(ctx, entities);
  }

  /**
   * Closes or shuts down the item world screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }
}
