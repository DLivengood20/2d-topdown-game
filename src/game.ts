import { CanvasManager } from './canvasManager';
import { EntityManager } from './entityManager';
import { SystemManager } from './systemManager';
import { initializeGameComponents } from './gameInitialization';
import { ScreenManager } from './screenManager';
import { InputService } from './inputService';

/**
 * Custom error class for game initialization errors.
 * @class
 */
class GameInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameInitializationError';
  }
}

/**
 * Custom error class for game update errors.
 * @class
 */
class GameUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameUpdateError';
  }
}

/**
 * Custom error class for game loop errors.
 * @class
 */
class GameLoopError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameLoopError';
  }
}

/**
 * The main game class responsible for initializing, updating, and rendering the game.
 * @class
 */
export class Game {
  private inputService: InputService;
  private canvasManager: CanvasManager;
  private entityManager: EntityManager;
  private systemManager: SystemManager;
  private screenManager: ScreenManager;

  /**
   * Constructs a new Game instance.
   * @constructor
   * @param {CanvasManager} canvasManager - The canvas manager for rendering graphics.
   * @param {EntityManager} entityManager - The entity manager for game entities.
   * @param {SystemManager} systemManager - The system manager for game systems.
   */
  private constructor(
    inputService: InputService,
    canvasManager: CanvasManager,
    entityManager: EntityManager,
    systemManager: SystemManager,
    screenManager: ScreenManager
  ) {
    this.inputService = inputService;
    this.canvasManager = canvasManager;
    this.entityManager = entityManager;
    this.systemManager = systemManager;
    this.screenManager = screenManager;
  }

  /**
   * Creates a new Game instance with initialized components.
   * @static
   * @returns {Game | null} A new Game instance or null if initialization fails.
   */
  static createGame(): Game | null {
    try {
      const inputService = new InputService();
      const canvasManager = new CanvasManager();
      const entityManager = new EntityManager();
      const systemManager = new SystemManager(canvasManager.getContext());
      const screenManager = new ScreenManager(inputService);

      initializeGameComponents(canvasManager, entityManager);

      return new Game(
        inputService,
        canvasManager,
        entityManager,
        systemManager,
        screenManager
      );
    } catch (error: any) {
      Game.prototype.handleInitializationError(error);
      return null;
    }
  }

  /**
   * Handles errors during game initialization.
   * @private
   * @param {Error} error - The error that occurred.
   * @throws {GameInitializationError} Always thrown to indicate the error.
   */
  private handleInitializationError(error: Error): void {
    console.error('Error during game initialization:', error);
    throw new GameInitializationError(
      `Game initialization failed: ${error.message}`
    );
  }

  /**
   * Starts the game loop.
   */
  public startGameLoop(): void {
    try {
      const gameLoop = () => {
        this.update();
        requestAnimationFrame(gameLoop);
      };
      requestAnimationFrame(gameLoop);
    } catch (error: any) {
      this.handleLoopError(error);
    }
  }

  /**
   * Handles errors during loops.
   * @param {Error} error - The error that occurred.
   * @throws {GameLoopError} Always thrown to indicate the error.
   * @private
   */
  private handleLoopError(error: Error): void {
    console.error('Error during game loop:', error);
    throw new GameLoopError(`Game loop failed: ${error.message}`);
  }

  /**
   * Updates the game logic.
   * - Updates all game systems with the current entities.
   * - Removes entities marked for removal.
   */
  private update(): void {
    const { startScreen, itemWorldScreen, loadGameScreen, gameMenuScreen } =
      this.screenManager;

    try {
      this.screenManager.update();
      if (startScreen.isDisplayed) {
        startScreen.render(this.canvasManager.getContext());
      }
      if (itemWorldScreen.isDisplayed) {
        itemWorldScreen.render(
          this.canvasManager.getContext(),
          this.entityManager.getAllEntities()
        );
      }
      if (itemWorldScreen.isActive) {
        this.systemManager.update(
          this.entityManager.getAllEntities(),
          this.inputService.keysPressed
        );
        this.entityManager.removeMarkedEntities();
      }
      if (loadGameScreen.isDisplayed) {
        loadGameScreen.render(this.canvasManager.getContext());
      }
      if (gameMenuScreen.isDisplayed) {
        gameMenuScreen.render(this.canvasManager.getContext());
      }
    } catch (error: any) {
      this.handleUpdateError(error);
    }
  }

  /**
   * Handles errors during updates.
   * @param {Error} error - The error that occurred.
   * @throws {GameUpdateError} Always thrown to indicate the error.
   * @private
   */
  private handleUpdateError(error: Error): void {
    console.error('Error during game update:', error);
    throw new GameUpdateError(`Game update failed: ${error.message}`);
  }
}
