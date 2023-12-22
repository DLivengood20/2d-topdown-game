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
   * The screen element representing the quit button.
   */
  quitButton: ScreenElement;

  /**
   * Creates a new StartScreen instance.
   */
  constructor() {
    this.startButton = ScreenElements.startButton;
    this.quitButton = ScreenElements.quitButton;
  }

  /**
   * Gets an array of screen elements associated with the start screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.startButton, this.quitButton];
  }

  /**
   * Renders the start screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);
    this.drawTitle(ctx);
    this.drawButton(ctx, this.startButton, 'Start');
    this.drawButton(ctx, this.quitButton, 'Quit');
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
   * Draws game title.
   * @private
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   */
  private drawTitle(ctx: CanvasRenderingContext2D) {
    // Draw the title
    this.drawText(
      ctx,
      'Game Title',
      this.startButton.x,
      this.startButton.y - 20
    );
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
}
