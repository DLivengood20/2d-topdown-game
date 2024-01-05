import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

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
  const {
    gameMenuScreen,
    itemWorldScreen,
    loadGameScreen,
    settingsScreen,
    saveGameScreen,
    titleScreen,
    mainHubScreen,
  } = gameScreens;

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
    itemWorldScreen.isActive = itemWorldScreen.isDisplayed;
    mainHubScreen.isActive = mainHubScreen.isDisplayed;
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
    loadGameScreen.openScreen();
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Opens the save game screen when save game menu button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    gameMenuScreen.saveGameButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    gameMenuScreen.isActive = false;
    gameMenuScreen.saveGameButton.isHovered = false;
    saveGameScreen.openScreen();
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
    settingsScreen.openScreen();
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Opens the title screen when open title button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    gameMenuScreen.openTitleButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    gameMenuScreen.shutScreen();
    mainHubScreen.isDisplayed = false;
    itemWorldScreen.isDisplayed = false;
    titleScreen.openScreen();
  } else screenKeyController.resetLeftClick(keysPressed);

  /**
   * Exits Program when quit button is clicked.
   */
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    gameMenuScreen.quitGameButton.isHovered
  ) {
    window.close();
  }
}
