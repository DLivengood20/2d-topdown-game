import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';

/**
 * Renders the title screen with buttons.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {ScreenElement} startButton - The button to start the game.
 * @param {ScreenElement} loadGameButton - The button to load a saved game.
 * @param {ScreenElement} settingsButton - The button to open the settings screen.
 * @param {ScreenElement} quitButton - The button to quit the game.
 * @returns {void}
 */
export function renderTitleScreen(
  ctx: CanvasRenderingContext2D,
  startButton: ScreenElement,
  loadGameButton: ScreenElement,
  settingsButton: ScreenElement,
  quitButton: ScreenElement
): void {
  const { clearCanvas, drawButton } = RenderUtility;
  clearCanvas(ctx);
  drawTitle(ctx);
  drawButton(ctx, startButton, 'Start');
  drawButton(ctx, loadGameButton, 'Load');
  drawButton(ctx, settingsButton, 'Settings');
  drawButton(ctx, quitButton, 'Quit');
}

/**
 * Draws the game title on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {void}
 */
function drawTitle(ctx: CanvasRenderingContext2D): void {
  const { x, y } = ScreenElements.Button_1;
  // Draw the title
  RenderUtility.drawText(ctx, 'Game Title', x, y - 20);
}
