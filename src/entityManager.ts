import { Entities } from './entities/entities';
import { Entity } from './entities/entity';
import { PlayerEntity } from './entities/player.entity';
import { RemoveEntityComponent } from './components/removeEntity.component';

/**
 * Manages entities within the game.
 * @class
 */
export class EntityManager {
  private entities: Set<Entity> = new Set<Entity>();

  /**
   * Initializes default entities.
   * @method
   * @returns {void}
   */
  initiateEntities(): void {
    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Entities;
    this.addEntities([DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3]);
  }

  /**
   * Creates and adds the default player entity.
   * @method
   * @returns {PlayerEntity} The created default player entity.
   */
  createDefaultPlayer(): PlayerEntity {
    const player = Entities.DEFAULT_PLAYER;
    if (!this.entities.has(player)) {
      this.entities.add(player);
    } else {
      console.error('Player already exists.');
    }
    return player;
  }

  /**
   * Adds a single entity to the manager.
   * @method
   * @param {Entity} entity - The entity to add.
   * @returns {void}
   */
  addEntity(entity: Entity): void {
    this.entities.add(entity);
  }

  /**
   * Adds multiple entities to the manager.
   * @method
   * @param {Entity[]} entities - The entities to add.
   * @returns {void}
   */
  addEntities(entities: Entity[]): void {
    for (const entity of entities) {
      this.entities.add(entity);
    }
  }

  /**
   * Removes a specific entity from the manager.
   * @method
   * @param {Entity} entity - The entity to remove.
   * @returns {void}
   */
  removeEntity(entity: Entity): void {
    this.entities.delete(entity);
  }

  /**
   * Removes entities marked for removal based on the presence of `RemoveEntityComponent`.
   * @method
   * @returns {void}
   */
  removeMarkedEntities(): void {
    for (const entity of this.entities) {
      if (entity.getComponent(RemoveEntityComponent)) {
        this.entities.delete(entity);
      }
    }
  }

  /**
   * Retrieves all entities managed by the manager.
   * @method
   * @returns {Entity[]} An array containing all managed entities.
   */
  getAllEntities(): Entity[] {
    return [...this.entities];
  }
}
