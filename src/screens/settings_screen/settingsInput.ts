import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the SettingsScreen.
 * Returns to the title screen when the Escape key is pressed
 * or when the close menu button is clicked.
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
 * @returns {void}
 * @public
 */
export function handleSettingsScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const { settingsScreen, titleScreen, gameMenuScreen, activeScreens } =
    gameScreens;

  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      settingsScreen.closeMenuButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    settingsScreen.shutScreen();
    activeScreens.removeScreen(settingsScreen);
    if (titleScreen.isDisplayed) activeScreens.addScreen(titleScreen);
    if (gameMenuScreen.isDisplayed) activeScreens.addScreen(gameMenuScreen);
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }
}
