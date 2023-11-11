import { Characters } from './constants';
import { Entity } from './entities/entity';
import { PlayerEntity } from './entities/player.entity';
import { RemoveEntityComponent } from './components/removeEntity.component';

export class EntityManager {
  private entities: Entity[] = [];

  initiateEntities(): void {
    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Characters;
    this.addEntities([DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3]);
  }

  createDefaultPlayer(): PlayerEntity {
    const player = Characters.DEFAULT_PLAYER;
    if (!this.entities.includes(player)) {
      this.entities.push(player);
    } else {
      console.error('Player already in array');
    }
    return player;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  addEntities(entities: Entity[]): void {
    this.entities.push(...entities);
  }

  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  removeMarkedEntities(): void {
    this.entities = this.entities.filter((entity) => {
      return (
        entity.getComponent<RemoveEntityComponent>(RemoveEntityComponent) ===
        undefined
      );
    });
  }

  getAllEntities(): Entity[] {
    return this.entities;
  }
}
