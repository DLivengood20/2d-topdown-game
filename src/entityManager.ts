import { Characters } from './constants';
import { Entity } from './entities/entity';
import { PlayerEntity } from './entities/player.entity';
import { RemoveEntityComponent } from './components/removeEntity.component';

/**
 * Manages entities within the game.
 * @class
 */
export class EntityManager {
  private entities: Entity[] = [];

  /**
   * Initializes default entities.
   * @method
   */
  initiateEntities(): void {
    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Characters;
    this.addEntities([DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3]);
  }

  /**
   * Creates and adds the default player entity.
   * @method
   * @returns {PlayerEntity} The created default player entity.
   */
  createDefaultPlayer(): PlayerEntity {
    const player = Characters.DEFAULT_PLAYER;
    if (!this.entities.includes(player)) {
      this.entities.push(player);
    } else {
      console.error('Player already in array');
    }
    return player;
  }

  /**
   * Adds a single entity to the manager.
   * @method
   * @param {Entity} entity - The entity to add.
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  /**
   * Adds multiple entities to the manager.
   * @method
   * @param {Entity[]} entities - The entities to add.
   */
  addEntities(entities: Entity[]): void {
    this.entities.push(...entities);
  }

  /**
   * Removes a specific entity from the manager.
   * @method
   * @param {Entity} entity - The entity to remove.
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Removes entities marked for removal based on the presence of `RemoveEntityComponent`.
   * @method
   */
  removeMarkedEntities(): void {
    this.entities = this.entities.filter((entity) => {
      return (
        entity.getComponent<RemoveEntityComponent>(RemoveEntityComponent) ===
        undefined
      );
    });
  }

  /**
   * Retrieves all entities managed by the manager.
   * @method
   * @returns {Entity[]} An array containing all managed entities.
   */
  getAllEntities(): Entity[] {
    return this.entities;
  }
}
