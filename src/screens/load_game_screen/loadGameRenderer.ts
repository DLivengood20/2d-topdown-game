import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the load game screen on the canvas.
 * @param ctx - The canvas rendering context.
 * @param closeLoadGameButton - The button to close the load game screen.
 */
export function renderLoadGameScreen(
  ctx: CanvasRenderingContext2D,
  closeLoadGameButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Load', closeLoadGameButton.x, 40);
  drawButton(ctx, closeLoadGameButton, 'Close');
}
