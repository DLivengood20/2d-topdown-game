import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

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
   * Transition to the main hub screen when Enter key is pressed
   * or when the start button is clicked.
   */
  const {
    titleScreen,
    loadGameScreen,
    settingsScreen,
    mainHubScreen,
    activeScreens,
    displayedScreens,
  } = gameScreens;
  if (
    keysPressed['Enter'] ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      titleScreen.startButton.isHovered)
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.removeScreen(titleScreen).addScreen(mainHubScreen);
    activeScreens.removeScreen(titleScreen).addScreen(mainHubScreen);
  } else screenKeyController.resetLeftClick(keysPressed);
  /**
   * Transition to the load game screen when the load game button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    titleScreen.loadGameButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.addScreen(loadGameScreen);
    activeScreens.removeScreen(titleScreen).addScreen(loadGameScreen);
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Transition to the settings screen when the settings button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    titleScreen.settingsButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    activeScreens.removeScreen(titleScreen).addScreen(settingsScreen);
    displayedScreens.addScreen(settingsScreen);
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
