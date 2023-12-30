import { GameScreensManager } from './screens/gameScreenManager';

/**
 * Service for handling user input related to the screen.
 */
export class ScreenInputService {
  /**
   * Indicates whether the left mouse button is currently pressed.
   * Used to prevent repeated actions when the button is held down.
   * @type {boolean}
   * @private
   */
  private leftMousePressed: boolean = false;

  /**
   * Indicates whether the Escape key is currently pressed.
   * Used to prevent repeated actions when the key is held down.
   * @type {boolean}
   * @private
   */
  private escapeKeyPressed: boolean = false;

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
    /**
     * Transition to the item world screen when Enter key is pressed
     * or when the start button is clicked.
     */
    const { startScreen, itemWorldScreen, loadGameScreen, settingsScreen } =
      gameScreens;
    if (
      keysPressed['Enter'] ||
      (this.isLeftClickTriggered(keysPressed) &&
        startScreen.startButton.isHovered)
    ) {
      this.leftMousePressed = true;
      startScreen.shutScreen();
      itemWorldScreen.isActive = true;
      itemWorldScreen.isDisplayed = true;
    } else this.resetLeftClick(keysPressed);
    /**
     * Transition to the load game screen when the load game button is clicked.
     */
    if (
      this.isLeftClickTriggered(keysPressed) &&
      startScreen.loadGameButton.isHovered
    ) {
      this.leftMousePressed = true;
      startScreen.isActive = false;
      startScreen.loadGameButton.isHovered = false;
      loadGameScreen.isActive = true;
      loadGameScreen.isDisplayed = true;
    } else this.resetLeftClick(keysPressed);

    /**
     * Transition to the settings screen when the settings button is clicked.
     */
    if (
      this.isLeftClickTriggered(keysPressed) &&
      startScreen.settingsButton.isHovered
    ) {
      this.leftMousePressed = true;
      startScreen.isActive = false;
      startScreen.settingsButton.isHovered = false;
      settingsScreen.isActive = true;
      settingsScreen.isDisplayed = true;
    } else this.resetLeftClick(keysPressed);

    /**
     * Close the application when the quit button is clicked.
     */
    if (
      this.isLeftClickTriggered(keysPressed) &&
      startScreen.quitButton.isHovered
    ) {
      window.close();
    } else this.resetLeftClick(keysPressed);
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
    const { gameMenuScreen, itemWorldScreen } = gameScreens;
    if (this.isEscapeKeyTriggered(keysPressed)) {
      this.escapeKeyPressed = true;

      gameMenuScreen.isActive = true;
      gameMenuScreen.isDisplayed = true;
      itemWorldScreen.isActive = false;
    } else this.resetEscapeKey(keysPressed);
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
    const { gameMenuScreen, itemWorldScreen, loadGameScreen, settingsScreen } =
      gameScreens;
    /**
     * Closes the game menu when Escape key is pressed or when the close menu button is clicked.
     */
    if (
      this.isEscapeKeyTriggered(keysPressed) ||
      (this.isLeftClickTriggered(keysPressed) &&
        gameMenuScreen.closeMenuButton.isHovered)
    ) {
      this.escapeKeyPressed = true;
      this.leftMousePressed = true;

      gameMenuScreen.shutScreen();
      itemWorldScreen.isActive = true;
    } else {
      this.resetEscapeKey(keysPressed);
      this.resetLeftClick(keysPressed);
    }

    /**
     * Opens the load game screen when load game menu button is clicked.
     */
    if (
      this.isLeftClickTriggered(keysPressed) &&
      gameMenuScreen.loadGameButton.isHovered
    ) {
      this.leftMousePressed = true;

      gameMenuScreen.isActive = false;
      gameMenuScreen.loadGameButton.isHovered = false;
      loadGameScreen.isDisplayed = true;
      loadGameScreen.isActive = true;
    } else this.resetLeftClick(keysPressed);
    /**
     * Opens the settings screen when settings button is clicked.
     */
    if (
      this.isLeftClickTriggered(keysPressed) &&
      gameMenuScreen.settingsButton.isHovered
    ) {
      this.leftMousePressed = true;

      gameMenuScreen.isActive = false;
      gameMenuScreen.settingsButton.isHovered = false;
      settingsScreen.isDisplayed = true;
      settingsScreen.isActive = true;
    } else this.resetLeftClick(keysPressed);
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
    const { loadGameScreen, startScreen, gameMenuScreen } = gameScreens;
    if (
      this.isEscapeKeyTriggered(keysPressed) ||
      (this.isLeftClickTriggered(keysPressed) &&
        loadGameScreen.closeLoadGameButton.isHovered)
    ) {
      this.escapeKeyPressed = true;
      this.leftMousePressed = true;

      loadGameScreen.shutScreen();
      startScreen.isActive = startScreen.isDisplayed;
      gameMenuScreen.isActive = gameMenuScreen.isDisplayed;
    } else {
      this.resetEscapeKey(keysPressed);
      this.resetLeftClick(keysPressed);
    }
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
    const { settingsScreen, startScreen, gameMenuScreen } = gameScreens;
    if (
      this.isEscapeKeyTriggered(keysPressed) ||
      (this.isLeftClickTriggered(keysPressed) &&
        settingsScreen.closeMenuButton.isHovered)
    ) {
      this.escapeKeyPressed = true;
      this.leftMousePressed = true;

      settingsScreen.shutScreen();
      startScreen.isActive = startScreen.isDisplayed;
      gameMenuScreen.isActive = gameMenuScreen.isDisplayed;
    } else {
      this.resetEscapeKey(keysPressed);
      this.resetLeftClick(keysPressed);
    }
  }

  /**
   * Checks if a left mouse click has been triggered.
   * @private
   * @returns {boolean} True if a left mouse click is triggered, false otherwise.
   */
  private isLeftClickTriggered(keysPressed: {
    [key: string]: boolean;
  }): boolean {
    return keysPressed['mousedown'] && !this.leftMousePressed;
  }

  /**
   * Resets the state of the left mouse click if the mouse button is not pressed.
   * @private
   * @returns {void}
   */
  private resetLeftClick(keysPressed: { [key: string]: boolean }): void {
    if (!keysPressed['mousedown']) {
      this.leftMousePressed = false;
    }
  }

  /**
   * Checks if the Escape key has been triggered.
   * @private
   * @returns {boolean} True if the Escape key is triggered, false otherwise.
   */
  private isEscapeKeyTriggered(keysPressed: {
    [key: string]: boolean;
  }): boolean {
    return keysPressed['Escape'] && !this.escapeKeyPressed;
  }

  /**
   * Resets the state of the Escape key if the key is not pressed.
   * @private
   * @returns {void}
   */
  private resetEscapeKey(keysPressed: { [key: string]: boolean }): void {
    if (!keysPressed['Escape']) {
      this.escapeKeyPressed = false;
    }
  }
}
