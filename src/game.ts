import { CanvasValues, Characters } from './constants';
import { Entity } from './entity';
import { System } from './system';
import { RenderSystem } from './render.system';
import { InputSystem } from './input.system';
import { StatusSystem } from './status.system';
import { AttackSystem } from './attack.system';
import { CollisionSystem } from './collision.system';
import { RemoveEntityComponent } from './removeEntity.component';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private entities: Entity[] = [];
  private systems: System[] = [];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CanvasValues.WIDTH;
    this.canvas.height = CanvasValues.HEIGHT;
    document.body.appendChild(this.canvas);

    if (this.ctx === null) {
      throw new Error('Unable to initialize CanvasRenderingContext2D.');
    }

    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Characters;

    this.entities.push(DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3);

    this.systems.push(
      new InputSystem(), // should be first system in array
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      new RenderSystem(this.ctx) // should be last system in array
    );
  }

  startGameLoop() {
    const gameLoop = () => {
      this.update();
      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
  }

  update() {
    // Update game logic here
    for (const system of this.systems) {
      system.update(this.entities);
    }
    for (const entity of this.entities) {
      if (
        entity.getComponent<RemoveEntityComponent>(RemoveEntityComponent) !==
        undefined
      ) {
        this.entities = this.entities.filter((keep) => keep !== entity);
      }
    }
  }
}
