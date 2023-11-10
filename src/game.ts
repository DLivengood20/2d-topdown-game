import { Characters } from './constants';
import { System } from './system';
import { RenderSystem } from './render.system';
import { InputSystem } from './input.system';
import { StatusSystem } from './status.system';
import { AttackSystem } from './attack.system';
import { CollisionSystem } from './collision.system';
import { RemoveEntityComponent } from './removeEntity.component';
import { CanvasInitialization } from './canvasInitialization';
import { EntityManager } from './entityManager';

export class Game {
  private canvasInitialization: CanvasInitialization;
  private entityManager: EntityManager = new EntityManager();
  private systems: System[] = [];

  constructor() {
    this.canvasInitialization = new CanvasInitialization();
    document.body.appendChild(this.canvasInitialization.getCanvas());

    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Characters;

    this.entityManager.addEntities([DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3]);

    this.systems.push(
      new InputSystem(), // should be first system in array
      new CollisionSystem(),
      new AttackSystem(),
      new StatusSystem(),
      new RenderSystem(this.canvasInitialization.getContext()) // should be last system in array
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
      system.update(this.entityManager.getAllEntities());
    }
    for (const entity of this.entityManager.getAllEntities()) {
      if (
        entity.getComponent<RemoveEntityComponent>(RemoveEntityComponent) !==
        undefined
      ) {
        this.entityManager.removeEntity(entity);
      }
    }
  }
}
