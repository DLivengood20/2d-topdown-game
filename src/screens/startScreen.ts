import { CanvasValues } from '../constants';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the starting screen in the game.
 * @implements {GameScreen}
 */
export class StartScreen implements GameScreen {
  /**
   * Indicates whether the start screen is currently active.
   */
  isActive: boolean = false;

  /**
   * The screen element representing the start button.
   */
  startButton: ScreenElement;

  /**
   * Creates a new StartScreen instance.
   */
  constructor() {
    this.startButton = ScreenElements.startButton;
  }

  /**
   * Gets an array of screen elements associated with the start screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.startButton];
  }

  /**
   * Renders the start screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);
    this.drawStartButton(ctx);
  }

  /**
   * Clears the entire canvas.
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  private clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx?.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  /**
   * Draws the start button on the canvas.
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  private drawStartButton(ctx: CanvasRenderingContext2D): void {
    const { x, y, width, height, isHovered } = this.startButton;
    if (!ctx) return;
    const offset = isHovered ? 3 : 0;

    // Draw the title
    this.drawText(
      ctx,
      'Game Title',
      this.startButton.x,
      this.startButton.y - 20
    );

    // Draw the start button with different color based on hover state
    const buttonColor = isHovered ? '#0066cc' : '#00f';
    ctx.fillStyle = buttonColor;
    ctx.fillRect(x + offset, y + offset, width, height);

    // Draw the start button text
    this.drawText(
      ctx,
      'Start',
      this.startButton.x + 20 + offset,
      this.startButton.y + 40 + offset,
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
}
