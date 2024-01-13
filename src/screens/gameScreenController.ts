import { InputService } from '../inputService';
import { GameScreensManager } from './gameScreenManager';
import { ScreenKeyController } from './input_services/screenKeyController';

/**
 * Manages different screens in the game and handles user input.
 * @class
 */
export class GameScreensController {
  /**
   * Collection of game screens managed by the ScreenManager.
   * @readonly
   */
  readonly gameScreens: GameScreensManager;

  /**
   * Controller for managing screen key events.
   * @readonly
   */
  readonly screenKeyController: ScreenKeyController;

  /**
   * Creates a new ScreenManager instance.
   * @param inputService - The input service used for handling user input.
   */
  constructor(private inputService: InputService) {
    this.gameScreens = new GameScreensManager();
    this.screenKeyController = new ScreenKeyController();
  }

  /**
   * Updates the mouse hover state for screen elements.
   * @private
   * @returns {void}
   */
  private updateScreenElements(): void {
    const { x, y } = this.inputService.mousePosition;
    for (const screen of this.gameScreens.activeScreens.getScreens()) {
      for (const element of screen.getElements()) {
        element.checkMouseHover(x, y);
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
    this.gameScreens.activeScreens.getScreens().forEach((screen) => {
      screen.handleInput(
        keysPressed,
        this.gameScreens,
        this.screenKeyController
      );
    });
  }
}
