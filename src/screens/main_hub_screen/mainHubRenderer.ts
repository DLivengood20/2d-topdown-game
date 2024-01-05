import { CanvasValues } from '../../constants';
import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the main hub screen on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {ScreenElement} openGameMenuButton - The button to open the game menu screen.
 * @param {ScreenElement} openInventoryButton - The button to open the inventory screen.
 * @param {ScreenElement} openCraftingMenuButton - The button to open the crafting menu screen.
 * @param {ScreenElement} openGameShopButton - The button to open the game shop screen.
 * @returns {void}
 */
export function renderMainHubScreen(
  ctx: CanvasRenderingContext2D,
  openGameMenuButton: ScreenElement,
  openInventoryButton: ScreenElement,
  openCraftingMenuButton: ScreenElement,
  openGameShopButton: ScreenElement
): void {
  const { clearCanvas, drawText, drawButton } = RenderUtility;
  clearCanvas(ctx);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  drawText(ctx, 'Main Hub', openGameMenuButton.x, 40);
  drawButton(ctx, openGameMenuButton, 'Menu');
  drawButton(ctx, openInventoryButton, 'Inventory');
  drawButton(ctx, openCraftingMenuButton, 'Crafting');
  drawButton(ctx, openGameShopButton, 'Shop');
}
