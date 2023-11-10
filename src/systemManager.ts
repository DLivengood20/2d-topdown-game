import { AttackSystem } from './attack.system';
import { CollisionSystem } from './collision.system';
import { Entity } from './entity';
import { InputSystem } from './input.system';
import { RenderSystem } from './render.system';
import { StatusSystem } from './status.system';
import { System } from './system';

export class SystemManager {
  private systems: System[] = [];

  initiateSystems(ctx: CanvasRenderingContext2D): void {
    this.systems.push(
      new InputSystem(), // should be first system in array
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      new RenderSystem(ctx) // should be last system in array
    );
  }

  update(entities: Entity[]): void {
    this.systems.forEach((system) => {
      system.update(entities);
    });
  }
}
