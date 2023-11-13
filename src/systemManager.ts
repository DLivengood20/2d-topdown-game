import { AttackSystem } from './systems/attack.system';
import { CollisionSystem } from './systems/collision.system';
import { Entity } from './entities/entity';
import { InputSystem } from './systems/input.system';
import { RenderSystem } from './systems/render.system';
import { StatusSystem } from './systems/status.system';
import { System } from './systems/system';

export class SystemManager {
  private systems: System[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.systems = [
      new InputSystem(), // should be first system in array
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      new RenderSystem(ctx), // should be last system in array
    ];
  }

  update(entities: Entity[]): void {
    this.systems.forEach((system) => {
      system.update(entities);
    });
  }
}
