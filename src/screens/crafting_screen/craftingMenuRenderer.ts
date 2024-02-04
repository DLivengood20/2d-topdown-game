import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the crafting menu screen on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {ScreenElement} closeCraftingMenuButton - The button to close the crafting menu screen.
 * @param {ScreenElement} openItemWorldButton - The button to open the item world screen.
 * @returns {void}
 */
export function renderCraftingMenuScreen(
  ctx: CanvasRenderingContext2D,
  closeCraftingMenuButton: ScreenElement,
  openItemWorldButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'CraftingMenu', closeCraftingMenuButton.x, 40);
  drawButton(ctx, closeCraftingMenuButton, 'Close');
  drawButton(ctx, openItemWorldButton, 'Enter Item World');
}
