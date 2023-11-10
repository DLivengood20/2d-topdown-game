import { Characters } from './constants';
import { Entity } from './entity';
import { PlayerEntity } from './player.entity';

export class EntityManager {
  private entities: Entity[] = [];

  createDefaultPlayer(): PlayerEntity {
    const player = Characters.DEFAULT_PLAYER;
    this.entities.push(player);
    return player;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  addEntities(entities: Entity[]): void {
    this.entities.push(...entities);
  }

  removeEntity(entity: Entity): void {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  getAllEntities(): Entity[] {
    return this.entities;
  }
}
