import { CanvasValues } from '../constants';
import { Entity } from '../entities/entity';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { WeaponComponent } from '../components/weapon.component';

export class RenderSystem implements System {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private drawBackground() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);

    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  private drawCharacter(
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent?: StatusComponent
  ) {
    const { x, y, width, height, heading } = physicalComponent;
    const { facingColor, stunColor, defaultColor } = renderComponent;

    const currentColor = statusComponent?.isStunned ? stunColor : defaultColor;

    renderComponent.currentColor = currentColor;

    this.ctx.translate(x, y);
    this.ctx.rotate(heading);

    this.ctx.fillStyle = renderComponent.currentColor;
    this.ctx.fillRect(-width / 2, -height / 2, width, height);

    this.ctx.fillStyle = facingColor;
    this.ctx.fillRect(-width / 2, height / 2 - 2, width, 2);
  }

  private drawWeapon(
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent,
    physicalComponent: PhysicalComponent
  ) {
    const rotation =
      (weaponComponent.swingAngle *
        (Date.now() - statusComponent.attackTimer)) /
      weaponComponent.attackDuration;
    const distanceFromUser = physicalComponent.width / 2;
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

  private drawHealth(statusComponent: StatusComponent) {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Health: ${statusComponent.health}`, 10, 30);
  }

  update(entities: Entity[]): void {
    this.drawBackground();

    for (const entity of entities) {
      const physicalComponent =
        entity.getComponent<PhysicalComponent>(PhysicalComponent);
      const renderComponent =
        entity.getComponent<RenderComponent>(RenderComponent);
      const weaponComponent =
        entity.getComponent<WeaponComponent>(WeaponComponent);
      const statusComponent =
        entity.getComponent<StatusComponent>(StatusComponent);

      if (renderComponent && physicalComponent) {
        this.ctx.save();
        this.drawCharacter(physicalComponent, renderComponent, statusComponent);
        if (weaponComponent && statusComponent?.isAttacking) {
          this.drawWeapon(weaponComponent, statusComponent, physicalComponent);
        }
        this.ctx.restore();
      }

      if (entity.id === 'PLAYER') {
        const playerStatus =
          entity.getComponent<StatusComponent>(StatusComponent);
        if (playerStatus) {
          this.drawHealth(playerStatus);
        }
      }
    }
  }
}
