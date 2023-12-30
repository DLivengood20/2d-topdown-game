import { GameMenuScreen } from './gameMenuScreen';
import { GameScreen } from './gameScreen';
import { ItemWorldScreen } from './itemWorldScreen';
import { LoadGameScreen } from './loadGameScreen';
import { SettingsScreen } from './settingsScreen';
import { StartScreen } from './startScreen';

/**
 * Collection of game screens.
 */
export class GameScreensManager {
  /**
   * The start screen.
   */
  startScreen: StartScreen;

  /**
   * The item world screen.
   */
  itemWorldScreen: ItemWorldScreen;

  /**
   * The load game screen.
   */
  loadGameScreen: LoadGameScreen;

  /**
   * The game menu screen.
   */
  gameMenuScreen: GameMenuScreen;

  /**
   * The settings screen.
   */
  settingsScreen: SettingsScreen;

  /**
   * Creates a new GameScreens instance.
   */
  constructor() {
    this.startScreen = new StartScreen();
    this.itemWorldScreen = new ItemWorldScreen();
    this.loadGameScreen = new LoadGameScreen();
    this.gameMenuScreen = new GameMenuScreen();
    this.settingsScreen = new SettingsScreen();
  }

  /**
   * Gets an array of all game screens.
   * @returns {GameScreen[]} An array of game screens.
   */
  getScreens(): GameScreen[] {
    return [
      this.startScreen,
      this.itemWorldScreen,
      this.loadGameScreen,
      this.gameMenuScreen,
      this.settingsScreen,
    ];
  }
}
