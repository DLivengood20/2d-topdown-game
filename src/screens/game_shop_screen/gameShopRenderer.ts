import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the game shop screen on the canvas.
 * @param ctx - The canvas rendering context.
 * @param closeGameShopButton - The button to close the game shop screen.
 */
export function renderGameShopScreen(
  ctx: CanvasRenderingContext2D,
  closeGameShopButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Shop', closeGameShopButton.x, 40);
  drawButton(ctx, closeGameShopButton, 'Close');
}
