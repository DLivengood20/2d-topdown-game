import { CanvasValues } from '../constants';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents a game menu screen implementing the GameScreen interface.
 */
export class GameMenuScreen implements GameScreen {
  /**
   * Indicates whether the game menu screen is currently active.
   */
  isActive: boolean = false;
  /**
   * Indicates whether the game menu screen is currently displayed.
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the close menu button.
   */
  closeMenuButton: ScreenElement;

  /**
   * Creates a new GameMenuScreen instance.
   */
  constructor() {
    this.closeMenuButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the game menu screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeMenuButton];
  }

  /**
   * Renders the game menu screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    this.drawBackground(ctx);
    this.drawText(ctx, 'Game Menu', this.closeMenuButton.x, 40);
    this.drawButton(ctx, this.closeMenuButton, 'Close');
  }

  /**
   * Draws a semi-transparent background on the canvas.
   *
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  private drawBackground(ctx: CanvasRenderingContext2D): void {
    /**
     * Sets the fill style of the canvas context to a semi-transparent black color.
     * @type {string}
     */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  /**
   * Draws a button on the canvas.
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @param {ScreenElement} button - The button to be drawn.
   */
  private drawButton(
    ctx: CanvasRenderingContext2D,
    button: ScreenElement,
    text: string
  ): void {
    const { x, y, width, height, isHovered } = button;
    if (!ctx) return;
    const offset = isHovered ? 3 : 0;

    // Draw the button with different color based on hover state
    const buttonColor = isHovered ? '#0066cc' : '#00f';
    ctx.fillStyle = buttonColor;
    ctx.fillRect(x + offset, y + offset, width, height);

    // Draw the button text
    this.drawText(
      ctx,
      text,
      button.x + 20 + offset,
      button.y + 40 + offset,
      '#fff'
    );
  }

  /**
   * Draws text on the canvas.
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @param {string} text - The text to be drawn.
   * @param {number} x - The x-coordinate of the text.
   * @param {number} y - The y-coordinate of the text.
   * @param {string} [color='black'] - The color of the text.
   */
  private drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string = 'black'
  ): void {
    ctx.fillStyle = color;
    ctx.font = '48px Arial';
    ctx.fillText(text, x, y);
  }

  /**
   * Closes or shuts down the current screen by updating its state properties.
   *
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
    this.closeMenuButton.isHovered = false;
  }
}
