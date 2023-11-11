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
 * The class that handles the initialization of the game components
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
 */
function handleInitializationError(error: Error): void {
  console.error('Error during game initialization:', error);
  throw new GameInitializationError(
    `Game initialization failed: ${error.message}`
  );
}
