import { CanvasValues } from '../constants';
import { Entity } from '../entities/entity';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { WeaponComponent } from '../components/weapon.component';

/**
 * A system for rendering entities on a canvas.
 * @implements {System}
 */
export class RenderSystem implements System {
  private ctx: CanvasRenderingContext2D;

  /**
   * Creates an instance of RenderSystem.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * Updates the rendering of entities on the canvas.
   * @param {Entity[]} entities - An array of entities to be rendered.
   */
  update(entities: Entity[]): void {
    this.drawBackground();

    for (const entity of entities) {
      const physicalComponent = entity.getComponent(PhysicalComponent);
      const renderComponent = entity.getComponent(RenderComponent);
      const weaponComponent = entity.getComponent(WeaponComponent);
      const statusComponent = entity.getComponent(StatusComponent);

      if (renderComponent && physicalComponent) {
        this.ctx.save();
        this.drawCharacter(physicalComponent, renderComponent, statusComponent);
        if (weaponComponent && statusComponent?.isAttacking) {
          this.drawWeapon(weaponComponent, statusComponent, physicalComponent);
        }
        this.ctx.restore();
      }

      if (entity.id === 'PLAYER') {
        const playerStatus = entity.getComponent(StatusComponent);
        if (playerStatus) {
          this.drawHealth(playerStatus);
        }
      }
    }
  }

  /**
   * Draws the background on the canvas.
   */
  private drawBackground(): void {
    // Clear the canvas
    this.ctx.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);

    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  /**
   * Draws a character on the canvas.
   * @param {PhysicalComponent} physicalComponent - The physical component of the character.
   * @param {RenderComponent} renderComponent - The render component of the character.
   * @param {StatusComponent} [statusComponent] - The status component of the character (optional).
   */
  private drawCharacter(
    { x, y, width, height, heading }: PhysicalComponent,
    { facingColor, stunColor, defaultColor }: RenderComponent,
    statusComponent?: StatusComponent
  ): void {
    const currentColor = statusComponent?.isStunned ? stunColor : defaultColor;

    this.ctx.translate(x, y);
    this.ctx.rotate(heading);

    this.ctx.fillStyle = currentColor;
    this.ctx.fillRect(-width / 2, -height / 2, width, height);

    this.ctx.fillStyle = facingColor;
    this.ctx.fillRect(-width / 2, height / 2 - 2, width, 2);
  }

  /**
   * Draws a weapon on the canvas.
   * @param {WeaponComponent} weaponComponent - The weapon component of the entity.
   * @param {StatusComponent} statusComponent - The status component of the entity.
   * @param {PhysicalComponent} { width } - The physical component of the entity.
   */
  private drawWeapon(
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent,
    { width }: PhysicalComponent
  ): void {
    const rotation =
      (weaponComponent.swingAngle *
        (Date.now() - statusComponent.attackTimer)) /
      weaponComponent.attackDuration;
    const distanceFromUser = width / 2;

    this.ctx.rotate(weaponComponent.swingAngle / 2 - rotation);
    this.ctx.translate(0, weaponComponent.width / 2);

    this.ctx.fillStyle = weaponComponent.color;
    this.ctx.fillRect(
      -weaponComponent.width / 2,
      distanceFromUser,
      weaponComponent.width,
      weaponComponent.length
    );
  }

  /**
   * Draws health information on the canvas.
   * @param {StatusComponent} { health } - The status component of the entity.
   */
  private drawHealth({ health }: StatusComponent): void {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Health: ${health}`, 10, 30);
  }
}
