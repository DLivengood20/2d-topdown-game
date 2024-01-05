import { PhysicalComponent } from '../../components/physical.component';
import { RenderComponent } from '../../components/render.component';
import { StatusComponent } from '../../components/status.component';
import { WeaponComponent } from '../../components/weapon.component';
import { CanvasValues } from '../../constants';
import { Entity } from '../../entities/entity';
import { RenderUtility } from '../../renderUtility';

/**
 * Renders items in the game world on the screen.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Entity[]} entities - An array of game entities to be rendered.
 * @returns {void}
 */
export function renderItemWorldScreen(
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
 * Draws the background for the item world on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {void}
 */
function drawItemWorldBackground(ctx: CanvasRenderingContext2D): void {
  RenderUtility.clearCanvas(ctx);

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
