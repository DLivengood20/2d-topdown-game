import { GameScreensManager } from '../gameScreenManager';
import { handleConstructionScreenInput } from '../construction_screen/constructionMenuInput';
import { handleCraftingScreenInput } from '../crafting_screen/craftingMenuInput';
import { handleGameMenuScreenInput } from '../game_menu_screen/gameMenuInput';
import { handleGameShopScreenInput } from '../game_shop_screen/gameShopInput';
import { handleInventoryScreenInput } from '../inventory_screen/inventoryInput';
import { handleItemWorldScreenInput } from '../item_world_screen/itemWorldInput';
import { handleLoadGameScreenInput } from '../load_game_screen/loadGameInput';
import { handleMainHubScreenInput } from '../main_hub_screen/mainHubInput';
import { handleSaveGameScreenInput } from '../save_game_screen/saveGameInput';
import { ScreenKeyController } from './screenKeyController';
import { handleSettingsScreenInput } from '../settings_screen/settingsInput';
import { handleTitleScreenInput } from '../title_screen/titleInput';

/**
 * Service for handling user input related to the screen.
 *
 * @class
 * @public
 */
export class ScreenInputService {
  /**
   * The controller for handling screen-related key events.
   *
   * @type {ScreenKeyController}
   * @public
   */
  screenKeyController: ScreenKeyController = new ScreenKeyController();

  /**
   * Handles user input on the TitleScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleTitleScreenInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager
  ): void {
    handleTitleScreenInput(keysPressed, gameScreens, this.screenKeyController);
  }

  /**
   * Handles user input on the ItemWorldScreen.
   * Opens the game menu when the Escape key is pressed.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleItemWorldScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleItemWorldScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the GameMenuScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleGameMenuScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleGameMenuScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the LoadGameScreen.
   * Returns to the title screen when the Escape key is pressed
   * or when the close load game button is clicked.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleLoadGameScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleLoadGameScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the SettingsScreen.
   * Returns to the title screen when the Escape key is pressed
   * or when the close menu button is clicked.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleSettingsScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleSettingsScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the SaveGameScreen.
   * Returns to the title screen when the Escape key is pressed
   * or when the close load game button is clicked.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleSaveGameScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleSaveGameScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the SettingsScreen.
   * Returns to the title screen when the Escape key is pressed
   * or when the close menu button is clicked.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleMainHubInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleMainHubScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the CraftingMenuScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleCraftingScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleCraftingScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the GameShopScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleGameShopScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleGameShopScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the InventoryScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleInventoryScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleInventoryScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }

  /**
   * Handles user input on the ConstructionScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleConstructionScreenInput(
    keysPressed: {
      [key: string]: boolean;
    },
    gameScreens: GameScreensManager
  ): void {
    handleConstructionScreenInput(
      keysPressed,
      gameScreens,
      this.screenKeyController
    );
  }
}
