import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the ConstructionScreen.
 * Closes the ConstructionScreen and activates the ItemWorldScreen
 * when the Escape key is pressed or the close button is clicked.
 *
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleConstructionScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const { itemWorldScreen, constructionScreen, activeScreens } = gameScreens;

  // Handle Escape key or close button
  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      constructionScreen.closeConstructionButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    constructionScreen.shutScreen();
    activeScreens.removeScreen(constructionScreen).addScreen(itemWorldScreen);
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }
}
