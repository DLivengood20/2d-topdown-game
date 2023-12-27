import { InputService } from './inputService';
import { GameMenuScreen } from './screens/gameMenuScreen';
import { GameScreen } from './screens/gameScreen';
import { ItemWorldScreen } from './screens/itemWorldScreen';
import { LoadGameScreen } from './screens/loadGameScreen';
import { StartScreen } from './screens/startScreen';

/**
 * Manages different screens in the game and handles user input.
 */
export class ScreenManager {
  /**
   * The StartScreen instance managed by the ScreenManager.
   * @type {StartScreen}
   */
  readonly startScreen: StartScreen;

  /**
   * The ItemWorldScreen instance managed by the ScreenManager.
   * @type {ItemWorldScreen}
   */
  readonly itemWorldScreen: ItemWorldScreen;

  /**
   * The LoadGameScreen instance managed by the ScreenManager.
   * @type {LoadGameScreen}
   */
  readonly loadGameScreen: LoadGameScreen;

  /**
   * The GameMenuScreen instance managed by the ScreenManager.
   * @type {GameMenuScreen}
   */
  readonly gameMenuScreen: GameMenuScreen;

  /**
   * Array of game screens managed by the ScreenManager.
   * @type {GameScreen[]}
   */
  readonly gameScreens: GameScreen[];

  /**
   * Indicates whether the Escape key is currently pressed.
   * Used to prevent repeated actions when the key is held down.
   * @type {boolean}
   * @private
   */
  private escapeKeyPressed: boolean = false;

  /**
   * Creates a new ScreenManager instance.
   * @param inputService - The input service used for handling user input.
   */
  constructor(private inputService: InputService) {
    this.startScreen = new StartScreen();
    this.itemWorldScreen = new ItemWorldScreen();
    this.loadGameScreen = new LoadGameScreen();
    this.gameMenuScreen = new GameMenuScreen();
    this.gameScreens = [
      this.startScreen,
      this.itemWorldScreen,
      this.loadGameScreen,
      this.gameMenuScreen,
    ];
  }

  /**
   * Updates the mouse hover state for screen elements.
   * @private
   * @returns {void}
   */
  private updateScreenElements(): void {
    const { x, y } = this.inputService.mousePosition;
    for (const screen of this.gameScreens) {
      if (screen.isActive) {
        for (const element of screen.getElements()) {
          element.checkMouseHover(x, y);
        }
      }
    }
  }

  /**
   * Updates the screen manager based on user input.
   * @public
   * @returns {void}
   */
  update(): void {
    this.updateScreenElements();
    if (this.startScreen.isActive) {
      this.handleStartScreenInput();
    } else if (this.itemWorldScreen.isActive) {
      this.handleItemWorldScreenInput();
    } else if (this.gameMenuScreen.isActive) {
      this.handleGameMenuScreenInput();
    } else if (this.loadGameScreen.isActive) {
      this.handleLoadGameScreenInput();
    }
  }

  /**
   * Handles user input on the StartScreen.
   * @private
   * @returns {void}
   */
  private handleStartScreenInput(): void {
    /**
     * Transition to the item world screen when Enter key is pressed
     * or when the start button is clicked.
     */
    const { keysPressed } = this.inputService;
    if (
      keysPressed['Enter'] ||
      (keysPressed['mousedown'] && this.startScreen.startButton.isHovered)
    ) {
      this.startScreen.isActive = false;
      this.startScreen.isDisplayed = false;
      this.itemWorldScreen.isActive = true;
      this.itemWorldScreen.isDisplayed = true;
    }
    /**
     * Transition to the load game screen when the load game button is clicked.
     */
    if (keysPressed['mousedown'] && this.startScreen.loadGameButton.isHovered) {
      this.startScreen.isActive = false;
      this.startScreen.loadGameButton.isHovered = false;
      this.loadGameScreen.isActive = true;
      this.loadGameScreen.isDisplayed = true;
    }
    /**
     * Close the application when the quit button is clicked.
     */
    if (keysPressed['mousedown'] && this.startScreen.quitButton.isHovered) {
      window.close();
    }
  }

  /**
   * Handles user input on the ItemWorldScreen.
   * Opens the game menu when Escape key is pressed.
   * @private
   * @returns {void}
   */
  private handleItemWorldScreenInput(): void {
    const { keysPressed } = this.inputService;

    // Check if the Escape key was just pressed
    if (keysPressed['Escape'] && !this.escapeKeyPressed) {
      this.escapeKeyPressed = true;

      this.gameMenuScreen.isActive = true;
      this.gameMenuScreen.isDisplayed = true;
      this.itemWorldScreen.isActive = false;
    } else if (!keysPressed['Escape']) {
      // Reset the flag when the Escape key is released
      this.escapeKeyPressed = false;
    }
  }

  /**
   * Handles user input on the GameMenuScreen.
   * Closes the game menu when Escape key is pressed or when the close menu button is clicked.
   * @private
   * @returns {void}
   */
  private handleGameMenuScreenInput(): void {
    const { keysPressed } = this.inputService;

    // Check if the Escape key was just pressed
    if (
      (keysPressed['Escape'] && !this.escapeKeyPressed) ||
      (keysPressed['mousedown'] &&
        this.gameMenuScreen.closeMenuButton.isHovered)
    ) {
      this.escapeKeyPressed = true;

      this.gameMenuScreen.shutScreen();
      this.itemWorldScreen.isActive = true;
    } else if (!keysPressed['Escape']) {
      // Reset the flag when the Escape key is released
      this.escapeKeyPressed = false;
    }
  }

  /**
   * Handles user input on the LoadGameScreen.
   * Returns to the start screen when Escape key is pressed or when the close load game button is clicked.
   * @private
   * @returns {void}
   */
  private handleLoadGameScreenInput(): void {
    const { keysPressed } = this.inputService;

    // Check if the Escape key was just pressed
    if (
      (keysPressed['Escape'] && !this.escapeKeyPressed) ||
      (keysPressed['mousedown'] &&
        this.loadGameScreen.closeLoadGameButton.isHovered)
    ) {
      this.escapeKeyPressed = true;

      this.loadGameScreen.shutScreen();
      this.startScreen.isActive = true;
      this.startScreen.isDisplayed = true;
    } else if (!keysPressed['Escape']) {
      // Reset the flag when the Escape key is released
      this.escapeKeyPressed = false;
    }
  }
}
