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
    this.systems = [
      new InputSystem(), // should be first system in array
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      new RenderSystem(ctx), // should be last system in array
    ];
  }

  /**
   * Updates all game systems with the provided entities.
   * @param {Entity[]} entities - An array of game entities.
   */
  update(entities: Entity[]): void {
    this.systems.forEach((system) => {
      system.update(entities);
    });
  }
}
