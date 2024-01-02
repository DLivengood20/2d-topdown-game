import { RenderUtility } from '../renderUtility';
import { GameScreen } from './gameScreen';
import { ScreenElement } from './screenElement';
import { ScreenElements } from './screenElements';

/**
 * Represents the main hub screen in the game.
 * @implements {GameScreen}
 */
export class MainHubScreen implements GameScreen {
  /**
   * Indicates whether the main hub screen is currently active.
   * @type {boolean}
   * @default false
   */
  isActive: boolean = false;

  /**
   * Indicates whether the main hub screen is currently displayed.
   * @type {boolean}
   * @default false
   */
  isDisplayed: boolean = false;

  /**
   * The screen element representing the open game menu button.
   * @type {ScreenElement}
   */
  openGameMenuButton: ScreenElement;

  /**
   * The screen element representing the open inventory button.
   * @type {ScreenElement}
   */
  openInventoryButton: ScreenElement;

  /**
   * The screen element representing the open crafting menu button.
   * @type {ScreenElement}
   */
  openCraftingMenuButton: ScreenElement;

  /**
   * The screen element representing the open game shop button.
   * @type {ScreenElement}
   */
  openGameShopButton: ScreenElement;

  /**
   * Creates a new MainHubScreen instance.
   */
  constructor() {
    this.openGameMenuButton = ScreenElements.Button_1;
    this.openInventoryButton = ScreenElements.Button_2;
    this.openCraftingMenuButton = ScreenElements.Button_3;
    this.openGameShopButton = ScreenElements.Button_4;
  }

  /**
   * Gets an array of screen elements associated with the main hub screen.
   * @returns {ScreenElement[]} An array of ScreenElement objects.
   */
  getElements(): ScreenElement[] {
    return [
      this.openGameMenuButton,
      this.openInventoryButton,
      this.openCraftingMenuButton,
      this.openGameShopButton,
    ];
  }

  /**
   * Renders the main hub screen on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D used for rendering.
   * @returns {void}
   */
  render(ctx: CanvasRenderingContext2D): void {
    RenderUtility.renderMainHubScreen(
      ctx,
      this.openGameMenuButton,
      this.openInventoryButton,
      this.openCraftingMenuButton,
      this.openGameShopButton
    );
  }

  /**
   * Closes or shuts down the main hub screen by updating its state properties.
   * @public
   * @returns {void}
   */
  shutScreen(): void {
    this.isActive = false;
    this.isDisplayed = false;
  }

  /**
   * Opens or activates the main hub screen by updating its state properties.
   * @public
   * @returns {void}
   */
  openScreen(): void {
    this.isActive = true;
    this.isDisplayed = true;
    this.openGameMenuButton.isHovered = false;
    this.openInventoryButton.isHovered = false;
    this.openCraftingMenuButton.isHovered = false;
    this.openGameShopButton.isHovered = false;
  }
}
