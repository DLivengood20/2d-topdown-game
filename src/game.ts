import { CanvasInitialization } from './canvasInitialization';
import { EntityManager } from './entityManager';
import { SystemManager } from './systemManager';
import { initializeGameComponents } from './gameInitialization';

/**
 * Custom error class for game update errors.
 */
class GameUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameUpdateError';
  }
}

/**
 * The main game class responsible for initializing, updating, and rendering the game.
 */
export class Game {
  private canvasInitialization: CanvasInitialization;
  private entityManager: EntityManager;
  private systemManager: SystemManager;

  /**
   * Constructs a new Game instance.
   */
  constructor() {
    this.canvasInitialization = new CanvasInitialization();
    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager();
  }

  /**
   * Starts the game loop.
   */
  public startGameLoop(): void {
    // Ensure initialization is called before starting the loop.
    initializeGameComponents(
      this.canvasInitialization,
      this.entityManager,
      this.systemManager
    );

    const gameLoop = () => {
      this.update();
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }

  /**
   * Updates the game logic.
   * - Updates all game systems with the current entities.
   * - Removes entities marked for removal.
   */
  private update(): void {
    try {
      this.systemManager.update(this.entityManager.getAllEntities());
      this.entityManager.removeMarkedEntities();
    } catch (error: any) {
      this.handleUpdateError(error);
    }
  }

  /**
   * Handles errors during updates.
   */
  private handleUpdateError(error: Error): void {
    console.error('Error during game update:', error);
    throw new GameUpdateError(`Game update failed: ${error.message}`);
  }
}
