import { GameScreensManager } from '../gameScreenManager';
import { handleGameMenuScreenInput } from './gameMenuInput';
import { handleItemWorldScreenInput } from './itemWorldInput';
import { handleLoadGameScreenInput } from './loadGameInput';
import { ScreenKeyController } from './screenKeyController';
import { handleSettingsScreenInput } from './settingsInput';
import { handleStartScreenInput } from './startInput';

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
   * Handles user input on the StartScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @returns {void}
   * @public
   */
  public handleStartScreenInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager
  ): void {
    handleStartScreenInput(keysPressed, gameScreens, this.screenKeyController);
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
   * Returns to the start screen when the Escape key is pressed
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
   * Returns to the start screen when the Escape key is pressed
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
}
