import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the inventory screen on the canvas.
 * @param ctx - The canvas rendering context.
 * @param closeInventoryButton - The button to close the inventory screen.
 */
export function renderInventoryScreen(
  ctx: CanvasRenderingContext2D,
  closeInventoryButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Inventory', closeInventoryButton.x, 40);
  drawButton(ctx, closeInventoryButton, 'Close');
}
