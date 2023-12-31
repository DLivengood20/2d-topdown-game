import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from './screenKeyController';

/**
 * Handles user input on the LoadGameScreen.
 * Returns to the start screen when the Escape key is pressed
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
  const { loadGameScreen, startScreen, gameMenuScreen } = gameScreens;

  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      loadGameScreen.closeLoadGameButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    loadGameScreen.shutScreen();
    startScreen.isActive = startScreen.isDisplayed;
    gameMenuScreen.isActive = gameMenuScreen.isDisplayed;
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }
}
