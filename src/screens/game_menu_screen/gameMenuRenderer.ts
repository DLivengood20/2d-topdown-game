import { RenderUtility } from '../../renderUtility';
import { ScreenElement } from '../screenElement';

/**
 * Renders the game menu screen on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {ScreenElement} closeButton - The screen element representing the close button.
 * @param {ScreenElement} saveButton - The screen element representing the save button.
 * @param {ScreenElement} loadButton - The screen element representing the load button.
 * @param {ScreenElement} settingsButton - The screen element representing the settings button.
 * @param {ScreenElement} openTitleButton - The screen element representing the button to open the title screen.
 * @param {ScreenElement} quitGameButton - The screen element representing the button to quit the game.
 * @returns {void}
 */
export function renderGameMenuScreen(
  ctx: CanvasRenderingContext2D,
  closeButton: ScreenElement,
  saveButton: ScreenElement,
  loadButton: ScreenElement,
  settingsButton: ScreenElement,
  openTitleButton: ScreenElement,
  quitGameButton: ScreenElement
): void {
  const { drawOverlayBackground, drawText, drawButton } = RenderUtility;
  drawOverlayBackground(ctx);
  drawText(ctx, 'Game Menu', closeButton.x, 40);
  drawButton(ctx, closeButton, 'Close');
  drawButton(ctx, saveButton, 'Save');
  drawButton(ctx, loadButton, 'Load');
  drawButton(ctx, settingsButton, 'Settings');
  drawButton(ctx, openTitleButton, 'Exit to title');
  drawButton(ctx, quitGameButton, 'Quit');
}
