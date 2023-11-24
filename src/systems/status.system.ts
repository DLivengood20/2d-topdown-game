import { Entity } from '../entities/entity';
import { move } from '../movementUtility';
import { PhysicalComponent } from '../components/physical.component';
import { RemoveEntityComponent } from '../components/removeEntity.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { Directions } from '../constants';

/**
 * Represents a system responsible for updating the status of entities.
 * @implements {System}
 */
export class StatusSystem implements System {
  /**
   * Updates the status of entities.
   * @param {Entity[]} entities - An array of entities to update.
   */
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const statusComponent = entity.getComponent(StatusComponent);
      const renderComponent = entity.getComponent(RenderComponent);
      const physicalComponent = entity.getComponent(PhysicalComponent);
      if (!statusComponent || !renderComponent) {
        return; // Skip entities without necessary components
      }
      // Update health and reset damage taken
      statusComponent.health -= statusComponent.damageTaken;
      statusComponent.damageTaken = 0;
      if (physicalComponent) {
        // Handle collisions and stun logic
        statusComponent.collidedWith.forEach((hazard) => {
          const hazardComponent = hazard.getComponent(PhysicalComponent);
          if (hazardComponent) {
            this.handleStun(entity, hazardComponent, statusComponent);
          }
        });
      }
      // Handle entity removal
      this.handleEntityRemoval(entity, statusComponent);
    });
  }

  /**
   * Applies knockback to an object based on a hazard's position.
   * @param {PhysicalComponent} object - The object to apply knockback to.
   * @param {PhysicalComponent} hazard - The hazard causing the knockback.
   */
  private applyKnockback(
    object: PhysicalComponent,
    hazard: PhysicalComponent
  ): void {
    const dx = object.x - hazard.x;
    const dy = object.y - hazard.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Move the player away from the enemy based on the normalized direction
    const moveDistance = object.speed * 2;
    move(object, normalizedDx * moveDistance, Directions.RIGHT);
    move(object, normalizedDy * moveDistance, Directions.BOTTOM);
  }

  /**
   * Handles the stun effect on an entity when colliding with a hazard.
   * @param {Entity} entity - The entity being stunned.
   * @param {PhysicalComponent} hazardComponent - The hazard causing the stun.
   * @param {StatusComponent} statusComponent - The status component of the stunned entity.
   */
  private handleStun(
    entity: Entity,
    hazardComponent: PhysicalComponent,
    statusComponent: StatusComponent
  ): void {
    if (entity.id === 'PLAYER') {
      statusComponent.isStunned = true;
      const entityComponent = entity.getComponent(PhysicalComponent);
      if (entityComponent)
        this.applyKnockback(entityComponent, hazardComponent);
      setTimeout(
        () => (statusComponent.isStunned = false),
        statusComponent.stunDuration
      );
    }
  }

  /**
   * Handles the removal of an entity when its health reaches zero.
   * @param {Entity} entity - The entity to be removed.
   * @param {StatusComponent} statusComponent - The status component of the entity.
   */
  private handleEntityRemoval(
    entity: Entity,
    statusComponent: StatusComponent
  ): void {
    if (statusComponent.health <= 0 && entity.id !== 'PLAYER') {
      entity.addComponent(new RemoveEntityComponent());
    }
  }
}
