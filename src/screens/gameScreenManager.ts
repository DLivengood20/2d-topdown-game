import { CraftingMenuScreen } from './craftingMenuScreen';
import { GameMenuScreen } from './gameMenuScreen';
import { GameScreen } from './gameScreen';
import { GameShopScreen } from './gameShopScreen';
import { InventoryScreen } from './inventoryScreen';
import { ItemWorldScreen } from './itemWorldScreen';
import { LoadGameScreen } from './loadGameScreen';
import { SaveGameScreen } from './saveGameScreen';
import { SettingsScreen } from './settingsScreen';
import { TitleScreen } from './titleScreen';

/**
 * Collection of game screens.
 */
export class GameScreensManager {
  /**
   * The title screen.
   */
  titleScreen: TitleScreen;

  /**
   * The item world screen.
   */
  itemWorldScreen: ItemWorldScreen;

  /**
   * The load game screen.
   */
  loadGameScreen: LoadGameScreen;

  /**
   * The save game screen.
   */
  saveGameScreen: SaveGameScreen;

  /**
   * The game menu screen.
   */
  gameMenuScreen: GameMenuScreen;

  /**
   * The settings screen.
   */
  settingsScreen: SettingsScreen;

  /**
   * The inventory screen.
   */
  inventoryScreen: InventoryScreen;

  /**
   * The game shop screen.
   */
  gameShopScreen: GameShopScreen;

  /**
   * The crafting menu screen.
   */
  craftingMenuScreen: CraftingMenuScreen;

  /**
   * Creates a new GameScreens instance.
   */
  constructor() {
    this.titleScreen = new TitleScreen();
    this.itemWorldScreen = new ItemWorldScreen();
    this.loadGameScreen = new LoadGameScreen();
    this.saveGameScreen = new SaveGameScreen();
    this.gameMenuScreen = new GameMenuScreen();
    this.settingsScreen = new SettingsScreen();
    this.inventoryScreen = new InventoryScreen();
    this.gameShopScreen = new GameShopScreen();
    this.craftingMenuScreen = new CraftingMenuScreen();
  }

  /**
   * Gets an array of all game screens.
   * @returns {GameScreen[]} An array of game screens.
   */
  getScreens(): GameScreen[] {
    return [
      this.titleScreen,
      this.itemWorldScreen,
      this.loadGameScreen,
      this.saveGameScreen,
      this.gameMenuScreen,
      this.settingsScreen,
      this.inventoryScreen,
      this.gameShopScreen,
      this.craftingMenuScreen,
    ];
  }
}
