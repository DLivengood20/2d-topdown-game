// Import necessary libraries
import { Game } from './game';

// Create an instance of the game
const game = Game.createGame();

if (game) {
  // Start the game loop
  game.startGameLoop();
} else {
  console.error('Game is null');
}
