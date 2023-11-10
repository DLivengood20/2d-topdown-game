import { Characters } from './constants';
import { CanvasInitialization } from './canvasInitialization';
import { EntityManager } from './entityManager';
import { SystemManager } from './systemManager';

export class Game {
  private canvasInitialization: CanvasInitialization;
  private entityManager: EntityManager = new EntityManager();
  private systemManager: SystemManager = new SystemManager();

  constructor() {
    this.canvasInitialization = new CanvasInitialization();
    document.body.appendChild(this.canvasInitialization.getCanvas());

    const { DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3 } = Characters;

    this.entityManager.addEntities([DEFAULT_PLAYER, ENEMY_1, ENEMY_2, ENEMY_3]);

    this.systemManager.initiateSystems(this.canvasInitialization.getContext());
  }

  startGameLoop() {
    const gameLoop = () => {
      this.update();
      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
  }

  update() {
    this.systemManager.update(this.entityManager.getAllEntities());
    this.entityManager.removeMarkedEntities();
  }
}
