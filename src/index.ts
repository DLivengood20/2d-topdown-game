// Import necessary libraries
import { Game } from './game';

// Create an instance of the game
const game = new Game();

// Start the game loop
function gameLoop() {
  game.update();
  game.render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
