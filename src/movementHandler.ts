import { CollisionCheck as collision } from './collisionCheck';
import { Player } from './player';
import { Enemy } from './enemy';

export class MovementHandler {
  static handleMovement(
    keysPressed: { [key: string]: boolean },
    player: Player,
    enemies: Array<Enemy>,
    canvas: HTMLCanvasElement
  ) {
    const enemyCollision = collision.enemies(player.move, enemies);

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.upperLeft(canvas, enemyCollision);
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.upperRight(canvas, enemyCollision);
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.lowerLeft(canvas, enemyCollision);
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.lowerRight(canvas, enemyCollision);
    } else if (keysPressed['ArrowUp']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.up(canvas, enemyCollision);
    } else if (keysPressed['ArrowDown']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.down(canvas, enemyCollision);
    } else if (keysPressed['ArrowLeft']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.left(canvas, enemyCollision);
    } else if (keysPressed['ArrowRight']) {
      if (enemyCollision) {
        player.takeDamage(10, true);
      }
      player.move.right(canvas, enemyCollision);
    }
  }
}
