import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the save game screen on the canvas.
 * @param ctx - The canvas rendering context.
 * @param closeSaveGameButton - The button to close the save game screen.
 */
export function renderSaveGameScreen(
  ctx: CanvasRenderingContext2D,
  closeSaveGameButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Save', closeSaveGameButton.x, 40);
  drawButton(ctx, closeSaveGameButton, 'Close');
}
