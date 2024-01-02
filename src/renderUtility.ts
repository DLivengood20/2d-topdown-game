import { CanvasValues } from './constants';
import { Entity } from './entities/entity';
import { PhysicalComponent } from './components/physical.component';
import { RenderComponent } from './components/render.component';
import { StatusComponent } from './components/status.component';
import { WeaponComponent } from './components/weapon.component';
import { ScreenElement } from './screens/screenElement';
import { ScreenElements } from './screens/screenElements';

/**
 * Utility class for rendering game elements on the canvas.
 */
export class RenderUtility {
  /**
   * Renders items in the game world on the screen.
   * @param ctx - The canvas rendering context.
   * @param entities - An array of game entities to be rendered.
   */
  static renderItemWorldScreen(
    ctx: CanvasRenderingContext2D,
    entities: Entity[]
  ): void {
    drawItemWorldBackground(ctx);

    for (const entity of entities) {
      const physicalComponent = entity.getComponent(PhysicalComponent);
      const renderComponent = entity.getComponent(RenderComponent);
      const weaponComponent = entity.getComponent(WeaponComponent);
      const statusComponent = entity.getComponent(StatusComponent);

      if (renderComponent && physicalComponent) {
        ctx.save();
        drawCharacter(ctx, physicalComponent, renderComponent, statusComponent);
        if (weaponComponent && statusComponent?.isAttacking) {
          drawWeapon(ctx, weaponComponent, statusComponent, physicalComponent);
        }
        ctx.restore();
      }

      if (entity.id === 'PLAYER') {
        const playerStatus = entity.getComponent(StatusComponent);
        if (playerStatus) {
          drawPlayerHealth(ctx, playerStatus);
        }
      }
    }
  }

  /**
   * Renders the load game screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeLoadGameButton - The button to close the load game screen.
   */
  static renderLoadGameScreen(
    ctx: CanvasRenderingContext2D,
    closeLoadGameButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Load', closeLoadGameButton.x, 40);
    drawButton(ctx, closeLoadGameButton, 'Close');
  }

  /**
   * Renders the save game screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeSaveGameButton - The button to close the save game screen.
   */
  static renderSaveGameScreen(
    ctx: CanvasRenderingContext2D,
    closeSaveGameButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Save', closeSaveGameButton.x, 40);
    drawButton(ctx, closeSaveGameButton, 'Close');
  }

  /**
   * Renders the title screen with buttons.
   * @param ctx - The canvas rendering context.
   * @param startButton - The button to start the game.
   * @param loadGameButton - The button to load a saved game.
   * @param quitButton - The button to quit the game.
   */
  static renderTitleScreen(
    ctx: CanvasRenderingContext2D,
    startButton: ScreenElement,
    loadGameButton: ScreenElement,
    settingsButton: ScreenElement,
    quitButton: ScreenElement
  ): void {
    clearCanvas(ctx);
    drawTitle(ctx);
    drawButton(ctx, startButton, 'Start');
    drawButton(ctx, loadGameButton, 'Load');
    drawButton(ctx, settingsButton, 'Settings');
    drawButton(ctx, quitButton, 'Quit');
  }

  /**
   * Renders the game menu screen on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @param {ScreenElement} closeButton - The screen element representing the close button.
   * @param {ScreenElement} loadButton - The screen element representing the load button.
   * @returns {void}
   */
  static renderGameMenuScreen(
    ctx: CanvasRenderingContext2D,
    closeButton: ScreenElement,
    saveButton: ScreenElement,
    loadButton: ScreenElement,
    settingsButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Game Menu', closeButton.x, 40);
    drawButton(ctx, closeButton, 'Close');
    drawButton(ctx, saveButton, 'Save');
    drawButton(ctx, loadButton, 'Load');
    drawButton(ctx, settingsButton, 'Settings');
  }

  /**
   * Renders the settings screen on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @param {ScreenElement} closeButton - The screen element representing the close button.
   * @returns {void}
   */
  static renderSettingsScreen(
    ctx: CanvasRenderingContext2D,
    closeButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Settings', closeButton.x, 40);
    drawButton(ctx, closeButton, 'Close');
  }

  /**
   * Renders the inventory screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeInventoryButton - The button to close the inventory screen.
   */
  static renderInventoryScreen(
    ctx: CanvasRenderingContext2D,
    closeInventoryButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Inventory', closeInventoryButton.x, 40);
    drawButton(ctx, closeInventoryButton, 'Close');
  }

  /**
   * Renders the crafting menu screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeCraftingMenuButton - The button to close the crafting menu screen.
   */
  static renderCraftingMenuScreen(
    ctx: CanvasRenderingContext2D,
    closeCraftingMenuButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'CraftingMenu', closeCraftingMenuButton.x, 40);
    drawButton(ctx, closeCraftingMenuButton, 'Close');
  }

  /**
   * Renders the game shop screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeGameShopButton - The button to close the game shop screen.
   */
  static renderGameShopScreen(
    ctx: CanvasRenderingContext2D,
    closeGameShopButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Shop', closeGameShopButton.x, 40);
    drawButton(ctx, closeGameShopButton, 'Close');
  }

  /**
   * Renders the construction screen on the canvas.
   * @param ctx - The canvas rendering context.
   * @param closeConstructionButton - The button to close the construction screen.
   */
  static renderConstructionScreen(
    ctx: CanvasRenderingContext2D,
    closeConstructionButton: ScreenElement
  ): void {
    drawOverlayBackground(ctx);
    drawText(ctx, 'Construction', closeConstructionButton.x, 40);
    drawButton(ctx, closeConstructionButton, 'Close');
  }
}

/**
 * Draws the background for the item world on the canvas.
 * @param ctx - The canvas rendering context.
 */
function drawItemWorldBackground(ctx: CanvasRenderingContext2D): void {
  clearCanvas(ctx);

  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
}

/**
 * Draws a character on the canvas.
 * @param ctx - The canvas rendering context.
 * @param physicalComponent - The physical component of the character.
 * @param renderComponent - The render component of the character.
 * @param statusComponent - The status component of the character.
 */
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, heading }: PhysicalComponent,
  { facingColor, stunColor, defaultColor }: RenderComponent,
  statusComponent?: StatusComponent
): void {
  const currentColor = statusComponent?.isStunned ? stunColor : defaultColor;

  ctx.translate(x, y);
  ctx.rotate(heading);

  ctx.fillStyle = currentColor;
  ctx.fillRect(-width / 2, -height / 2, width, height);

  ctx.fillStyle = facingColor;
  ctx.fillRect(-width / 2, height / 2 - 2, width, 2);
}

/**
 * Draws a weapon on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {WeaponComponent} weaponComponent - The weapon component of the entity.
 * @param {StatusComponent} statusComponent - The status component of the entity.
 * @param {PhysicalComponent} physicalComponent - The physical component of the entity.
 * @returns {void}
 */
function drawWeapon(
  ctx: CanvasRenderingContext2D,
  weaponComponent: WeaponComponent,
  statusComponent: StatusComponent,
  { width }: PhysicalComponent
): void {
  const rotation =
    (weaponComponent.swingAngle * (Date.now() - statusComponent.attackTimer)) /
    weaponComponent.attackDuration;
  const distanceFromUser = width / 2;

  ctx.rotate(weaponComponent.swingAngle / 2 - rotation);
  ctx.translate(0, weaponComponent.width / 2);

  ctx.fillStyle = weaponComponent.color;
  ctx.fillRect(
    -weaponComponent.width / 2,
    distanceFromUser,
    weaponComponent.width,
    weaponComponent.length
  );
}

/**
 * Draws player health on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {StatusComponent} statusComponent - The status component of the player.
 * @returns {void}
 */
function drawPlayerHealth(
  ctx: CanvasRenderingContext2D,
  { health }: StatusComponent
): void {
  ctx.fillStyle = 'black';
  ctx.font = '18px Arial';
  ctx.fillText(`Health: ${health}`, 10, 30);
}

/**
 * Draws a button on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {ScreenElement} button - The button element to be drawn.
 * @param {string} text - The text to be displayed on the button.
 * @returns {void}
 */
function drawButton(
  ctx: CanvasRenderingContext2D,
  button: ScreenElement,
  text: string
): void {
  const { x, y, width, height, isHovered } = button;
  const offset = isHovered ? 3 : 0;

  // Draw the button with different color based on hover state
  const buttonColor = isHovered ? '#0066cc' : '#00f';
  ctx.fillStyle = buttonColor;
  ctx.fillRect(x + offset, y + offset, width, height);

  // Draw the button text
  drawText(ctx, text, button.x + 20 + offset, button.y + 40 + offset, '#fff');
}

/**
 * Draws text on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {string} text - The text to be drawn.
 * @param {number} x - The x-coordinate of the text.
 * @param {number} y - The y-coordinate of the text.
 * @param {string} [color='black'] - The color of the text.
 * @returns {void}
 */
function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = 'black'
): void {
  ctx.fillStyle = color;
  ctx.font = '48px Arial';
  ctx.fillText(text, x, y);
}

/**
 * Draws an overlay background on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {void}
 */
function drawOverlayBackground(ctx: CanvasRenderingContext2D): void {
  /**
   * Sets the fill style of the canvas context to a semi-transparent black color.
   * @type {string}
   */
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
}

/**
 * Clears the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {void}
 */
function clearCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
}

/**
 * Draws the game title on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {void}
 */
function drawTitle(ctx: CanvasRenderingContext2D): void {
  const { x, y } = ScreenElements.Button_1;
  // Draw the title
  drawText(ctx, 'Game Title', x, y - 20);
}
