import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the settings screen on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {ScreenElement} closeButton - The screen element representing the close button.
 * @returns {void}
 */
export function renderSettingsScreen(
  ctx: CanvasRenderingContext2D,
  closeButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Settings', closeButton.x, 40);
  drawButton(ctx, closeButton, 'Close');
}
