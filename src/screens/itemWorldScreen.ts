import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';

export class ItemWorldScreen implements GameScreen {
  isActive: boolean = true;

  getElements(): ScreenElement[] {
    return [];
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Implement rendering for ItemWorldScreen
  }
}
