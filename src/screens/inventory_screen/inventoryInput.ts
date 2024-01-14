import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the InventoryScreen.
 * Closes the inventory screen when the Escape key is pressed or when the close button is clicked.
 *
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for handling screen-related key events.
 * @returns {void}
 * @public
 */
export function handleInventoryScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const {
    mainHubScreen,
    inventoryScreen,
    itemWorldScreen,
    activeScreens,
    displayedScreens,
  } = gameScreens;

  if (
    screenKeyController.isEscapeKeyTriggered(keysPressed) ||
    (screenKeyController.isLeftClickTriggered(keysPressed) &&
      inventoryScreen.closeInventoryButton.isHovered)
  ) {
    screenKeyController.setEscapeKeyPressed(true);
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.removeScreen(inventoryScreen);
    activeScreens.removeScreen(inventoryScreen);
    if (displayedScreens.getByName(mainHubScreen.name))
      activeScreens.addScreen(mainHubScreen);
    if (displayedScreens.getByName(itemWorldScreen.name))
      activeScreens.addScreen(itemWorldScreen);
  } else {
    screenKeyController.resetEscapeKey(keysPressed);
    screenKeyController.resetLeftClick(keysPressed);
  }
}
