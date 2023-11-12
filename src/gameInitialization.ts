import { CanvasInitialization } from './canvasInitialization';
import { EntityManager } from './entityManager';
import { SystemManager } from './systemManager';

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
 * @param {CanvasInitialization} canvasInitialization - The canvas initialization instance.
 * @param {EntityManager} entityManager - The entity manager instance.
 * @param {SystemManager} systemManager - The system manager instance.
 * @throws {GameInitializationError} Throws an error if initialization fails.
 */
export function initializeGameComponents(
  canvasInitialization: CanvasInitialization,
  entityManager: EntityManager,
  systemManager: SystemManager
): void {
  try {
    // Initialize the canvas and game systems
    document.body.appendChild(canvasInitialization.getCanvas());

    // Initialize entities to the entity manager
    entityManager.initiateEntities();

    // Initialize game systems with the canvas context
    systemManager.initiateSystems(canvasInitialization.getContext());
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
