import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';

/**
 * Handles user input on the MainHubScreen.
 *
 * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
 * @param {GameScreensManager} gameScreens - The collection of game screens.
 * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
 * @returns {void}
 * @public
 */
export function handleMainHubScreenInput(
  keysPressed: {
    [key: string]: boolean;
  },
  gameScreens: GameScreensManager,
  screenKeyController: ScreenKeyController
): void {
  const {
    mainHubScreen,
    gameMenuScreen,
    inventoryScreen,
    craftingMenuScreen,
    gameShopScreen,
    activeScreens,
    displayedScreens,
  } = gameScreens;

  // Check if Escape key is pressed to open the Game Menu screen
  if (screenKeyController.isEscapeKeyTriggered(keysPressed)) {
    screenKeyController.setEscapeKeyPressed(true);

    displayedScreens.addScreen(gameMenuScreen);
    activeScreens.removeScreen(mainHubScreen).addScreen(gameMenuScreen);
  } else screenKeyController.resetEscapeKey(keysPressed);

  // Check if left click is triggered and the Game Menu button is hovered
  // Opens game menu and deactivates main hub
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    mainHubScreen.openGameMenuButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.addScreen(gameMenuScreen);
    activeScreens.removeScreen(mainHubScreen).addScreen(gameMenuScreen);
  } else {
    screenKeyController.resetLeftClick(keysPressed);
  }

  // Check if left click is triggered and the Inventory button is hovered
  // Opens inventory and deactivates main hub
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    mainHubScreen.openInventoryButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.addScreen(inventoryScreen);
    activeScreens.removeScreen(mainHubScreen).addScreen(inventoryScreen);
  } else {
    screenKeyController.resetLeftClick(keysPressed);
  }

  // Check if left click is triggered and the Crafting Menu button is hovered
  // Opens crafting menu and deactivates main hub
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    mainHubScreen.openCraftingMenuButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.addScreen(craftingMenuScreen);
    activeScreens.removeScreen(mainHubScreen).addScreen(craftingMenuScreen);
  } else {
    screenKeyController.resetLeftClick(keysPressed);
  }

  // Check if left click is triggered and the Game Shop button is hovered
  // Opens game shop and deactivates main hub
  if (
    screenKeyController.isLeftClickTriggered(keysPressed) &&
    mainHubScreen.openGameShopButton.isHovered
  ) {
    screenKeyController.setLeftMousePressed(true);

    displayedScreens.addScreen(gameMenuScreen);
    activeScreens.removeScreen(mainHubScreen).addScreen(gameShopScreen);
  } else {
    screenKeyController.resetLeftClick(keysPressed);
  }
}
