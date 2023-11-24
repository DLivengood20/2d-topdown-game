import { CanvasManager } from './canvasManager';
import { EntityManager } from './entityManager';

/**
 * Custom error class for game initialization errors.
 */
class GameInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameInitializationError';
  }
}

/**
 * Initializes the game components.
 * @param {CanvasManager} canvasManager - The canvas initialization instance.
 * @param {EntityManager} entityManager - The entity manager instance.
 * @throws {GameInitializationError} Throws an error if initialization fails.
 */
export function initializeGameComponents(
  canvasManager: CanvasManager,
  entityManager: EntityManager
): void {
  try {
    // Initialize the canvas
    document.body.appendChild(canvasManager.getCanvas());

    // Initialize entities to the entity manager
    entityManager.initiateEntities();
  } catch (error: any) {
    handleInitializationError(error);
  }
}

/**
 * Handles errors during initialization.
 * @param {Error} error - The error that occurred during initialization.
 * @throws {GameInitializationError} Throws a game initialization error.
 */
function handleInitializationError(error: Error): void {
  console.error('Error during game initialization:', error);
  throw new GameInitializationError(
    `Game initialization failed: ${error.message}`
  );
}
