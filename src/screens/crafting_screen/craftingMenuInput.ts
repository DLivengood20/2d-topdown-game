import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the CraftingMenuScreen.
 * Opens the MainHubScreen when the Escape key is pressed or the close button is clicked.
 * Opens the ItemWorldScreen when the open item world button is clicked.
 *
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleCraftingScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const {
    mainHubScreen,
    craftingMenuScreen,
    itemWorldScreen,
    activeScreens,
    displayedScreens,
  } = gameScreens;

  // Handle Escape key or close button
  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      craftingMenuScreen.closeCraftingMenuButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.removeScreen(craftingMenuScreen).addScreen(mainHubScreen);
    activeScreens.removeScreen(craftingMenuScreen).addScreen(mainHubScreen);
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }

  // Handle open item world button
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    craftingMenuScreen.openItemWorldButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens
      .removeScreen(mainHubScreen)
      .removeScreen(craftingMenuScreen)
      .addScreen(itemWorldScreen);
    activeScreens
      .removeScreen(mainHubScreen)
      .removeScreen(craftingMenuScreen)
      .addScreen(itemWorldScreen);
  } else {
    screenKeyController.resetLeftClick(keysPressed);
  }
}
