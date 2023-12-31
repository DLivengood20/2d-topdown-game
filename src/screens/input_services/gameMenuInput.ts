import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from './screenKeyController';

/**
 * Handles user input on the GameMenuScreen.
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleGameMenuScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const { gameMenuScreen, itemWorldScreen, loadGameScreen, settingsScreen } =
    gameScreens;

  /**
   * Closes the game menu when the Escape key is pressed or when the close menu button is clicked.
   */
  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      gameMenuScreen.closeMenuButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    gameMenuScreen.shutScreen();
    itemWorldScreen.isActive = true;
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }

  /**
   * Opens the load game screen when load game menu button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    gameMenuScreen.loadGameButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    gameMenuScreen.isActive = false;
    gameMenuScreen.loadGameButton.isHovered = false;
    loadGameScreen.isDisplayed = true;
    loadGameScreen.isActive = true;
  } else screenKeyController.resetLeftClick(keysPressed);
  /**
   * Opens the settings screen when settings button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    gameMenuScreen.settingsButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    gameMenuScreen.isActive = false;
    gameMenuScreen.settingsButton.isHovered = false;
    settingsScreen.isDisplayed = true;
    settingsScreen.isActive = true;
  } else screenKeyController.resetLeftClick(keysPressed);
}
