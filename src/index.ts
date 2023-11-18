/**
 * Import necessary libraries.
 * @module
 */
import { Game } from './game';

/**
 * Create an instance of the game.
 * @const {Game | null}
 */
const game = Game.createGame();

/**
 * Start the game loop if the game instance is not null.
 * Log an error message if the game is null.
 */
if (game) {
  /**
   * Function to start the game loop.
   * @function
   */
  game.startGameLoop();
} else {
  /**
   * Log an error message if the game instance is null.
   * @type {string}
   */
  console.error('Game is null');
}
