import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the LoadGameScreen.
 * Returns to the title screen when the Escape key is pressed
 * or when the close load game button is clicked.
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleLoadGameScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const { loadGameScreen, titleScreen, gameMenuScreen, activeScreens } =
    gameScreens;

  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      loadGameScreen.closeLoadGameButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    loadGameScreen.shutScreen();
    activeScreens.removeScreen(loadGameScreen);
    if (titleScreen.isDisplayed) activeScreens.addScreen(titleScreen);
    if (gameMenuScreen.isDisplayed) activeScreens.addScreen(gameMenuScreen);
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }
}
