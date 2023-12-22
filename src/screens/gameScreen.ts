import { ScreenElement } from './screenElement';

export interface GameScreen {
  isActive: boolean;
  getElements(): ScreenElement[];
  render(ctx: CanvasRenderingContext2D): void;
}
