import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleSettingsScreenInput } from './settingsInput';
import { renderSettingsScreen } from './settingsRenderer';

/**
 * Represents a game settings screen implementing the GameScreen interface.
 * @implements {GameScreen}
 */
export class SettingsScreen implements GameScreen {
  /**
   * The name of the settings screen.
   * @readonly
   */
  readonly name: string = 'settings';

  /**
   * The screen element representing the close menu button.
   */
  closeMenuButton: ScreenElement;

  /**
   * Creates a new SettingsScreen instance.
   */
  constructor() {
    this.closeMenuButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the settings screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeMenuButton];
  }

  /**
   * Renders the settings screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context for the canvas.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderSettingsScreen(ctx, this.closeMenuButton);
  }

  /**
   * Handles user input on the SettingsScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
   * @returns {void}
   * @public
   */
  handleInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager,
    screenKeyController: ScreenKeyController
  ): void {
    handleSettingsScreenInput(keysPressed, gameScreens, screenKeyController);
  }
}
