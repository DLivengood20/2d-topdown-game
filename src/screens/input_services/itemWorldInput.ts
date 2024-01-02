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
  const { gameMenuScreen, itemWorldScreen, constructionScreen } = gameScreens;

  // Check if Escape key is pressed to open the Game Menu screen
  if (screenKeyController.isEscapeKeyTriggered(keysPressed)) {
    screenKeyController.setEscapeKeyPressed(true);

    gameMenuScreen.openScreen();
    itemWorldScreen.isActive = false;
  } else screenKeyController.resetEscapeKey(keysPressed);

  // Check if C key is pressed to open the Construction screen
  if (screenKeyController.isCTriggered(keysPressed)) {
    screenKeyController.setCPressed(true);

    constructionScreen.openScreen();
    itemWorldScreen.isActive = false;
  } else screenKeyController.resetCKey(keysPressed);
}
