import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from './screenKeyController';

/**
 * Handles user input on the ItemWorldScreen.
 * Opens the game menu when the Escape key is pressed.
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleItemWorldScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const { gameMenuScreen, itemWorldScreen } = gameScreens;

  if (screenKeyController.isEscapeKeyTriggered(keysPressed)) {
    screenKeyController.setEscapeKeyPressed(true);

    gameMenuScreen.isActive = true;
    gameMenuScreen.isDisplayed = true;
    itemWorldScreen.isActive = false;
  } else screenKeyController.resetEscapeKey(keysPressed);
}
