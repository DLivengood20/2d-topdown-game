import { Entity } from '../entities/entity';
import { moveDown, moveRight } from '../movementUtility';
import { PhysicalComponent } from '../components/physical.component';
import { RemoveEntityComponent } from '../components/removeEntity.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';

export class StatusSystem implements System {
  private applyknockback(object: PhysicalComponent, hazard: PhysicalComponent) {
    const dx = object.x - hazard.x;
    const dy = object.y - hazard.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Move the player away from the enemy based on the normalized direction
    const moveDistance = object.speed * 2;

    moveRight(object, normalizedDx * moveDistance);
    moveDown(object, normalizedDy * moveDistance);
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      const statusComponent =
        entity.getComponent<StatusComponent>(StatusComponent);
      const renderComponent =
        entity.getComponent<RenderComponent>(RenderComponent);
      const physicalComponent =
        entity.getComponent<PhysicalComponent>(PhysicalComponent);
      if (statusComponent && renderComponent) {
        statusComponent.health -= statusComponent.damageTaken;
        statusComponent.damageTaken = 0;
        if (physicalComponent) {
          for (const hazard of statusComponent.collidedWith) {
            const hazardComponent =
              hazard.getComponent<PhysicalComponent>(PhysicalComponent);
            if (hazardComponent && entity.id === 'PLAYER') {
              statusComponent.isStunned = true;
              this.applyknockback(physicalComponent, hazardComponent);
              setTimeout(
                () => (statusComponent.isStunned = false),
                statusComponent.stunDuration
              );
            }
          }
        }
        if (statusComponent.health <= 0 && entity.id !== 'PLAYER') {
          entity.addComponent(new RemoveEntityComponent());
        }
      }
    }
  }
}
