import { Entity } from '../entities/entity';

/**
 * Interface representing a game system.
 * Game systems are responsible for updating entities in the game.
 * @interface
 */
export interface System {
  /**
   * Updates the game system with the provided entities.
   * @param {Entity[]} entities - The entities to be updated.
   */
  update(entities: Entity[]): void;
}
