import { GameScreen } from '../gameScreen';
import { GameScreensManager } from '../gameScreenManager';
import { ScreenKeyController } from '../input_services/screenKeyController';
import { ScreenElement } from '../screenElement';
import { ScreenElements } from '../screenElements';
import { handleConstructionScreenInput } from './constructionMenuInput';
import { renderConstructionScreen } from './constructionRenderer';

/**
 * Represents the construction screen in the game.
 * @implements {GameScreen}
 */
export class ConstructionScreen implements GameScreen {
  /**
   * The name of the construction screen.
   * @readonly
   */
  readonly name: string = 'construction';

  /**
   * The screen element representing the close construction button.
   * @type {ScreenElement}
   */
  closeConstructionButton: ScreenElement;

  /**
   * Creates a new ConstructionScreen instance.
   */
  constructor() {
    this.closeConstructionButton = ScreenElements.Button_1;
  }

  /**
   * Gets an array of screen elements associated with the construction screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [this.closeConstructionButton];
  }

  /**
   * Renders the construction screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    renderConstructionScreen(ctx, this.closeConstructionButton);
  }

  /**
   * Resets the construction screen elements to default
   * @returns {this}
   */
  reset(): this {
    this.getElements().forEach((element) => {
      element.isHovered = false;
    });
    return this;
  }

  /**
   * Handles user input on the ConstructionScreen.
   * @param {Object.<string, boolean>} keysPressed - The keys currently pressed by the user.
   * @param {GameScreensManager} gameScreens - The collection of game screens.
   * @param {ScreenKeyController} screenKeyController - The controller for managing user input related to screen keys.
   * @returns {void}
   * @public
   */
  handleInput(
    keysPressed: { [key: string]: boolean },
    gameScreens: GameScreensManager,
    screenKeyController: ScreenKeyController
  ): void {
    handleConstructionScreenInput(
      keysPressed,
      gameScreens,
      screenKeyController
    );
  }
}
