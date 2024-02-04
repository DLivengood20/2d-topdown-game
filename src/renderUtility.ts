import { CanvasValues } from './constants';
import { ScreenElement } from './screens/screenElement';

/**
 * Utility class for rendering game elements on the canvas.
 */
export class RenderUtility {
  /**
   * Draws a button on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {ScreenElement} button - The button element to be drawn.
   * @param {string} text - The text to be displayed on the button.
   * @returns {void}
   */
  static drawButton(
    ctx: CanvasRenderingContext2D,
    button: ScreenElement,
    text: string
  ): void {
    const { x, y, width, height, isHovered } = button;
    const offset = isHovered ? 3 : 0;

    // Draw the button with different color based on hover state
    const buttonColor = isHovered ? '#0066cc' : '#00f';
    ctx.fillStyle = buttonColor;
    ctx.fillRect(x + offset, y + offset, width, height);

    // Draw the button text
    RenderUtility.drawText(
      ctx,
      text,
      button.x + 20 + offset,
      button.y + 40 + offset,
      '#fff'
    );
  }

  /**
   * Draws text on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {string} text - The text to be drawn.
   * @param {number} x - The x-coordinate of the text.
   * @param {number} y - The y-coordinate of the text.
   * @param {string} [color='black'] - The color of the text.
   * @returns {void}
   */
  static drawText(
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
   * Draws an overlay background on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @returns {void}
   */
  static drawOverlayBackground(ctx: CanvasRenderingContext2D): void {
    /**
     * Sets the fill style of the canvas context to a semi-transparent black color.
     * @type {string}
     */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  /**
   * Clears the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @returns {void}
   */
  static clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }
}
