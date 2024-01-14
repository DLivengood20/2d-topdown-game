import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

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
  const {
    gameMenuScreen,
    itemWorldScreen,
    constructionScreen,
    activeScreens,
    displayedScreens,
  } = gameScreens;

  // Check if Escape key is pressed to open the Game Menu screen
  if (screenKeyController.isEscapeKeyTriggered(keysPressed)) {
    screenKeyController.setEscapeKeyPressed(true);

    displayedScreens.addScreen(gameMenuScreen);
    activeScreens.removeScreen(itemWorldScreen).addScreen(gameMenuScreen);
  } else screenKeyController.resetEscapeKey(keysPressed);

  // Check if C key is pressed to open the Construction screen
  if (screenKeyController.isCTriggered(keysPressed)) {
    screenKeyController.setCPressed(true);

    displayedScreens.addScreen(constructionScreen);
    activeScreens.removeScreen(itemWorldScreen).addScreen(constructionScreen);
  } else screenKeyController.resetCKey(keysPressed);
}
