import { ConstructionScreen } from './construction_screen/constructionScreen';
import { CraftingMenuScreen } from './crafting_screen/craftingMenuScreen';
import { GameMenuScreen } from './game_menu_screen/gameMenuScreen';
import { GameScreen } from './gameScreen';
import { GameShopScreen } from './game_shop_screen/gameShopScreen';
import { InventoryScreen } from './inventory_screen/inventoryScreen';
import { ItemWorldScreen } from './item_world_screen/itemWorldScreen';
import { LoadGameScreen } from './load_game_screen/loadGameScreen';
import { MainHubScreen } from './main_hub_screen/mainHubScreen';
import { SaveGameScreen } from './save_game_screen/saveGameScreen';
import { SettingsScreen } from './settings_screen/settingsScreen';
import { TitleScreen } from './title_screen/titleScreen';
import { GameScreenStateStorage } from './gameScreenStateStorage';

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
   * The construction screen.
   */
  constructionScreen: ConstructionScreen;

  /**
   * The main hub screen.
   */
  mainHubScreen: MainHubScreen;

  /**
   * Storage for the active game screens.
   * @readonly
   */
  readonly activeScreens: GameScreenStateStorage;

  /**
   * Storage for the displayed game screens.
   * @readonly
   */
  readonly displayedScreens: GameScreenStateStorage;

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
    this.constructionScreen = new ConstructionScreen();
    this.mainHubScreen = new MainHubScreen();
    this.activeScreens = new GameScreenStateStorage();
    this.activeScreens.addScreen(this.titleScreen);
    this.displayedScreens = new GameScreenStateStorage();
    this.displayedScreens.addScreen(this.titleScreen);
  }

  /**
   * Gets an array of all game screens.
   * @returns {GameScreen[]} An array of game screens.
   */
  getScreens(): GameScreen[] {
    // Order of screens decides rendering order. Last element is rendered last.
    return [
      this.titleScreen,
      this.mainHubScreen,
      this.itemWorldScreen,
      this.gameMenuScreen,
      this.loadGameScreen,
      this.saveGameScreen,
      this.settingsScreen,
      this.inventoryScreen,
      this.gameShopScreen,
      this.craftingMenuScreen,
      this.constructionScreen,
    ];
  }
}
