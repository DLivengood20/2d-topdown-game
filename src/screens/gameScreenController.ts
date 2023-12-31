import { InputService } from '../inputService';
import { GameScreensManager } from './gameScreenManager';
import { ScreenInputService } from './input_services/screenInputService';

/**
 * Manages different screens in the game and handles user input.
 * @class
 */
export class GameScreensController {
  /**
   * The input service used for handling user input in screens.
   * @readonly
   */
  readonly screenInputService: ScreenInputService;

  /**
   * Collection of game screens managed by the ScreenManager.
   * @readonly
   */
  readonly gameScreens: GameScreensManager;

  /**
   * Creates a new ScreenManager instance.
   * @param inputService - The input service used for handling user input.
   */
  constructor(private inputService: InputService) {
    this.gameScreens = new GameScreensManager();
    this.screenInputService = new ScreenInputService();
  }

  /**
   * Updates the mouse hover state for screen elements.
   * @private
   * @returns {void}
   */
  private updateScreenElements(): void {
    const { x, y } = this.inputService.mousePosition;
    for (const screen of this.gameScreens.getScreens()) {
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
    const { keysPressed } = this.inputService;
    this.updateScreenElements();
    if (this.gameScreens.startScreen.isActive) {
      this.screenInputService.handleStartScreenInput(
        keysPressed,
        this.gameScreens
      );
    } else if (this.gameScreens.itemWorldScreen.isActive) {
      this.screenInputService.handleItemWorldScreenInput(
        keysPressed,
        this.gameScreens
      );
    } else if (this.gameScreens.gameMenuScreen.isActive) {
      this.screenInputService.handleGameMenuScreenInput(
        keysPressed,
        this.gameScreens
      );
    } else if (this.gameScreens.loadGameScreen.isActive) {
      this.screenInputService.handleLoadGameScreenInput(
        keysPressed,
        this.gameScreens
      );
    } else if (this.gameScreens.settingsScreen.isActive) {
      this.screenInputService.handleSettingsScreenInput(
        keysPressed,
        this.gameScreens
      );
    }
  }
}
