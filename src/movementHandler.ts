import { CollisionCheck as collision } from './collisionCheck';
import { Player } from './player';
import { Enemy } from './enemy';
import { FacingAngles } from './facingAngles';

export class MovementHandler {
  static handleMovement(
    keysPressed: { [key: string]: boolean },
    player: Player,
    enemies: Array<Enemy>,
    canvas: HTMLCanvasElement
  ) {
    const enemyCollision = collision.enemies(player, enemies);
    const wallCollision = collision.border(player, canvas);

    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      player.facing = FacingAngles.TopLeft;
      if (enemyCollision) {
        player.y += player.diagonalSpeed * 2;
        player.x += player.diagonalSpeed * 2;
        player.takeDamage(10, true);
      } else {
        if (wallCollision.top) {
          player.y = player.height / 2;
        } else {
          player.y -= player.diagonalSpeed;
        }
        if (wallCollision.left) {
          player.x = player.width / 2;
        } else {
          player.x -= player.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      player.facing = FacingAngles.TopRight;
      if (enemyCollision) {
        player.y += player.diagonalSpeed * 2;
        player.x -= player.diagonalSpeed * 2;
        player.takeDamage(10, true);
      } else {
        if (wallCollision.top) {
          player.y = player.height / 2;
        } else {
          player.y -= player.diagonalSpeed;
        }
        if (wallCollision.right) {
          player.x = canvas.width - player.width / 2;
        } else {
          player.x += player.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      player.facing = FacingAngles.BottomLeft;
      if (enemyCollision) {
        player.y -= player.diagonalSpeed * 2;
        player.x += player.diagonalSpeed * 2;
        player.takeDamage(10, true);
      } else {
        if (wallCollision.bottom) {
          player.y = canvas.height - player.height / 2;
        } else {
          player.y += player.diagonalSpeed;
        }
        if (wallCollision.left) {
          player.x = player.width / 2;
        } else {
          player.x -= player.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      player.facing = FacingAngles.BottomRight;
      if (enemyCollision) {
        player.y -= player.diagonalSpeed * 2;
        player.x -= player.diagonalSpeed * 2;
        player.takeDamage(10, true);
      } else {
        if (wallCollision.bottom) {
          player.y = canvas.height - player.height / 2;
        } else {
          player.y += player.diagonalSpeed;
        }
        if (wallCollision.right) {
          player.x = canvas.width - player.width / 2;
        } else {
          player.x += player.diagonalSpeed;
        }
      }
    } else if (keysPressed['ArrowUp']) {
      player.facing = FacingAngles.Top;
      if (enemyCollision) {
        player.y += player.speed * 2;
        player.takeDamage(10, true);
      } else if (wallCollision.top) {
        player.y = player.height / 2;
      } else {
        player.y -= player.speed;
      }
    } else if (keysPressed['ArrowDown']) {
      player.facing = FacingAngles.Bottom;
      if (enemyCollision) {
        player.y -= player.speed * 2;
        player.takeDamage(10, true);
      } else if (wallCollision.bottom) {
        player.y = canvas.height - player.height / 2;
      } else {
        player.y += player.speed;
      }
    } else if (keysPressed['ArrowLeft']) {
      player.facing = FacingAngles.Left;
      if (enemyCollision) {
        player.x += player.speed * 2;
        player.takeDamage(10, true);
      } else if (wallCollision.left) {
        player.x = player.width / 2;
      } else {
        player.x -= player.speed;
      }
    } else if (keysPressed['ArrowRight']) {
      player.facing = FacingAngles.Right;
      if (enemyCollision) {
        player.x -= player.speed * 2;
        player.takeDamage(10, true);
      } else if (wallCollision.right) {
        player.x = canvas.width - player.width / 2;
      } else {
        player.x += player.speed;
      }
    }
  }
}
