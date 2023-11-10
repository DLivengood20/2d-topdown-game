import { Entity } from '../entities/entity';
import { PhysicalComponent } from '../components/physical.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';

export class CollisionSystem implements System {
  private checkCollisionWith(
    entity: Entity,
    collidables: Array<Entity>
  ): Entity[] {
    const collidedWith = [];
    const entityComponent =
      entity.getComponent<PhysicalComponent>(PhysicalComponent);

    for (const collidable of collidables) {
      const collidableComponent =
        collidable.getComponent<PhysicalComponent>(PhysicalComponent);
      if (collidableComponent && entityComponent) {
        const { x, y, width, height } = collidableComponent;
        if (
          x + width / 2 > entityComponent.x - entityComponent.width / 2 &&
          x - width / 2 < entityComponent.x + entityComponent.width / 2 &&
          y + height / 2 > entityComponent.y - entityComponent.height / 2 &&
          y - height / 2 < entityComponent.y + entityComponent.height / 2
        ) {
          collidedWith.push(collidable);
          const entityStatus =
            entity.getComponent<StatusComponent>(StatusComponent);
          const collidedStatus =
            collidable.getComponent<StatusComponent>(StatusComponent);
          if (entityStatus && collidedStatus) {
            entityStatus.damageTaken += collidedStatus.collisionDamage;
          }
        }
      }
    }
    return collidedWith;
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      const statusComponent =
        entity.getComponent<StatusComponent>(StatusComponent);
      if (statusComponent) {
        statusComponent.collidedWith = [];
        const collidables = entities.filter((other) => other !== entity);
        statusComponent.collidedWith = this.checkCollisionWith(
          entity,
          collidables
        );
      }
    }
  }
}
