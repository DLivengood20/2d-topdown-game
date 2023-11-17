import { Entity } from '../entities/entity';
import { PhysicalComponent } from '../components/physical.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';

/**
 * Represents a system responsible for detecting and handling collisions between entities.
 * @implements {System}
 */
export class CollisionSystem implements System {
  /**
   * Updates the collision status for each entity in the game.
   * @param {Entity[]} entities - An array of entities in the game.
   */
  update(entities: Entity[]): void {
    for (const entity of entities) {
      const statusComponent = entity.getComponent(StatusComponent);
      if (statusComponent) {
        // Reset collidedWith array for the current entity
        statusComponent.collidedWith = [];
        // Filter out the current entity from the collidables
        const collidables = entities.filter((other) => other !== entity);
        // Check for collisions and update collidedWith array
        statusComponent.collidedWith = this.checkCollisionWith(
          entity,
          collidables
        );
      }
    }
  }

  /**
   * Checks for collisions with a specific entity among a set of collidables.
   * @param {Entity} entity - The entity for which collisions are checked.
   * @param {Entity[]} collidables - An array of entities that could potentially collide with the specified entity.
   * @returns {Entity[]} An array of entities collided with the specified entity.
   */
  private checkCollisionWith(
    entity: Entity,
    collidables: Array<Entity>
  ): Entity[] {
    const collidedWith: Entity[] = [];
    const entityComponent = entity.getComponent(PhysicalComponent);

    for (const collidable of collidables) {
      const collidableComponent = collidable.getComponent(PhysicalComponent);
      if (
        collidableComponent &&
        entityComponent &&
        this.determineCollision(entityComponent, collidableComponent)
      ) {
        collidedWith.push(collidable);

        // Inflict damage based on collision settings
        const entityStatus = entity.getComponent(StatusComponent);
        const collidedStatus = collidable.getComponent(StatusComponent);
        if (entityStatus && collidedStatus) {
          entityStatus.damageTaken += collidedStatus.collisionDamage;
        }
      }
    }
    return collidedWith;
  }

  /**
   * Determines whether two physical components are colliding.
   * @param {PhysicalComponent} physicalComponent_1 - The first physical component.
   * @param {PhysicalComponent} physicalComponent_2 - The second physical component.
   * @returns {boolean} Returns true if the two components are colliding, otherwise false.
   */
  private determineCollision(
    physicalComponent_1: PhysicalComponent,
    physicalComponent_2: PhysicalComponent
  ): boolean {
    const { x, y, width, height } = physicalComponent_1;
    return (
      x + width / 2 > physicalComponent_2.x - physicalComponent_2.width / 2 &&
      x - width / 2 < physicalComponent_2.x + physicalComponent_2.width / 2 &&
      y + height / 2 > physicalComponent_2.y - physicalComponent_2.height / 2 &&
      y - height / 2 < physicalComponent_2.y + physicalComponent_2.height / 2
    );
  }
}
