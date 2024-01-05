import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the construction screen on the canvas.
 * @param ctx - The canvas rendering context.
 * @param closeConstructionButton - The button to close the construction screen.
 */
export function renderConstructionScreen(
  ctx: CanvasRenderingContext2D,
  closeConstructionButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Construction', closeConstructionButton.x, 40);
  drawButton(ctx, closeConstructionButton, 'Close');
}
