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
   */
  readonly startScreen: StartScreen;

  /**
   * The ItemWorldScreen instance managed by the ScreenManager.
   */
  readonly itemWorldScreen: ItemWorldScreen;

  /**
   * The LoadGameScreen instance managed by the ScreenManager.
   */
  readonly loadGameScreen: LoadGameScreen;

  /**
   * The LoadGameScreen instance managed by the ScreenManager.
   */
  readonly gameMenuScreen: GameMenuScreen;

  /**
   * Array of game screens managed by the ScreenManager.
   * @type {GameScreen[]}
   */
  readonly gameScreens: GameScreen[];

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
    const { keysPressed } = this.inputService;

    if (this.startScreen.isActive) {
      /**
       * Transition to the item world screen when Enter key is pressed
       * or when the start button is clicked.
       */
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
      if (
        keysPressed['mousedown'] &&
        this.startScreen.loadGameButton.isHovered
      ) {
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

    if (this.loadGameScreen.isActive) {
      /**
       * Return to the start screen when Escape key is pressed
       * or when the close load game button is clicked.
       */
      if (
        keysPressed['Escape'] ||
        (keysPressed['mousedown'] &&
          this.loadGameScreen.closeLoadGameButton.isHovered)
      ) {
        this.loadGameScreen.shutScreen();
        this.startScreen.isActive = true;
        this.startScreen.isDisplayed = true;
      }
    }

    if (this.gameMenuScreen.isActive) {
      /**
       * Close the game menu when Escape key is pressed
       * or when the close menu button is clicked.
       */
      if (
        keysPressed['Escape'] ||
        (keysPressed['mousedown'] &&
          this.gameMenuScreen.closeMenuButton.isHovered)
      ) {
        this.gameMenuScreen.shutScreen();
        this.itemWorldScreen.isActive = true;
      }
    }

    /**
     * Open the game menu when Escape key is pressed in the item world screen.
     */
    if (this.itemWorldScreen.isActive && keysPressed['Escape']) {
      this.gameMenuScreen.isActive = true;
      this.gameMenuScreen.isDisplayed = true;
      this.itemWorldScreen.isActive = false;
    }
  }
}
