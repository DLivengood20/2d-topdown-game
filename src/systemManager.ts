import { AttackSystem } from './systems/attack.system';
import { CollisionSystem } from './systems/collision.system';
import { Entity } from './entities/entity';
import { InputSystem } from './systems/input.system';
import { RenderSystem } from './systems/render.system';
import { StatusSystem } from './systems/status.system';
import { System } from './systems/system';

/**
 * Manages and updates various game systems in a specific order.
 * @class
 */
export class SystemManager {
  /**
   * Array containing instances of different game systems.
   * @private
   */
  private systems: System[];

  /**
   * Constructs a new SystemManager instance.
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  constructor(ctx: CanvasRenderingContext2D) {
    /**
     * Array containing instances of different game systems.
     * @type {System[]}
     * @private
     */
    // The order of the systems is critical. Systems will access and modify shared component data.
    this.systems = [
      // First system: User inputs are prioritized as they are a response to the last game tick.
      new InputSystem(),
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      // Last system: Rendering needs to be the final step for accurate visual representation.
      new RenderSystem(ctx),
    ];
  }

  /**
   * Updates all game systems with the provided entities.
   * @param {Entity[]} entities - An array of game entities.
   */
  update(entities: Entity[]): void {
    for (const system of this.systems) {
      system.update(entities);
    }
  }
}
