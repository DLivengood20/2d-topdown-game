import { InputService } from './inputService';
import { GameScreen } from './screens/gameScreen';
import { ItemWorldScreen } from './screens/itemWorldScreen';
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
    this.gameScreens = [this.startScreen, this.itemWorldScreen];
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
      if (
        keysPressed['Enter'] ||
        (keysPressed['mousedown'] && this.startScreen.startButton.isHovered)
      ) {
        this.startScreen.isActive = false;
        this.itemWorldScreen.isActive = true;
      }
      if (keysPressed['mousedown'] && this.startScreen.quitButton.isHovered) {
        window.close();
      }
    }

    if (keysPressed['Escape']) {
      this.startScreen.isActive = true;
      this.itemWorldScreen.isActive = false;
    }
  }
}
