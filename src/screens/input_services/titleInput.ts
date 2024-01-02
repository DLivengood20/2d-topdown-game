import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from './screenKeyController';

/**
 * Handles user input on the TitleScreen.
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
 * @returns {void}
 * @public
 */
export function handleTitleScreenInput(
  keysPressed: { [key: string]: boolean },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  /**
   * Transition to the item world screen when Enter key is pressed
   * or when the start button is clicked.
   */
  const { titleScreen, itemWorldScreen, loadGameScreen, settingsScreen } =
    gameScreens;
  if (
    keysPressed['Enter'] ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      titleScreen.startButton.isHovered)
  ) {
    screenKeyController.setLeftMousePressed(true);
    titleScreen.shutScreen();
    itemWorldScreen.isActive = true;
    itemWorldScreen.isDisplayed = true;
  } else screenKeyController.resetLeftClick(keysPressed);
  /**
   * Transition to the load game screen when the load game button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    titleScreen.loadGameButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);
    titleScreen.isActive = false;
    titleScreen.loadGameButton.isHovered = false;
    loadGameScreen.isActive = true;
    loadGameScreen.isDisplayed = true;
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Transition to the settings screen when the settings button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    titleScreen.settingsButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);
    titleScreen.isActive = false;
    titleScreen.settingsButton.isHovered = false;
    settingsScreen.isActive = true;
    settingsScreen.isDisplayed = true;
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Close the application when the quit button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    titleScreen.quitButton.isHovered
  ) {
    window.close();
  } else screenKeyController.resetLeftClick(keysPressed);
}