import { CanvasValues } from '../constants';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

export class StartScreen implements GameScreen {
  isActive: boolean = false;
  startButton: ScreenElement;

  constructor() {
    this.startButton = ScreenElements.startButton;
  }

  getElements(): ScreenElement[] {
    return [this.startButton];
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);
    this.drawStartButton(ctx);
  }

  private clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx?.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

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
