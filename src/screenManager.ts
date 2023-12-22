import { InputService } from './inputService';
import { ItemWorldScreen } from './screens/itemWorldScreen';
import { ScreenElement } from './screens/screenElement';
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
   * Creates a new ScreenManager instance.
   * @param inputService - The input service used for handling user input.
   */
  constructor(private inputService: InputService) {
    this.startScreen = new StartScreen();
    this.itemWorldScreen = new ItemWorldScreen();
  }

  /**
   * Updates the mouse hover state for screen elements.
   * @private
   */
  private updateScreenElements(): void {
    const { x, y } = this.inputService.mousePosition;
    const elements: ScreenElement[] = [...this.startScreen.getElements()];
    for (const element of elements) {
      element.checkMouseHover(x, y);
    }
  }

  /**
   * Updates the screen manager based on user input.
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
    }

    if (keysPressed['Escape']) {
      this.startScreen.isActive = true;
      this.itemWorldScreen.isActive = false;
    }
  }
}
