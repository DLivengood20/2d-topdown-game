import {
  moveBottomLeft,
  moveBottomRight,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  moveUpLeft,
  moveUpRight,
} from './movementUtility';
import { Player } from './player';
import { attackHandler } from './attackHandler';
import { Enemy } from './enemy';

export function playerInput(
  keysPressed: { [key: string]: boolean },
  player: Player,
  enemies: Array<Enemy>
) {
  if (player.isStunned || player.isAttacking) {
    return;
  }
  if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
    moveUpLeft(player.body, player.body.diagonalSpeed, true);
  } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
    moveUpRight(player.body, player.body.diagonalSpeed, true);
  } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
    moveBottomLeft(player.body, player.body.diagonalSpeed, true);
  } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
    moveBottomRight(player.body, player.body.diagonalSpeed, true);
  } else if (keysPressed['ArrowUp']) {
    moveUp(player.body, player.body.speed, true);
  } else if (keysPressed['ArrowDown']) {
    moveDown(player.body, player.body.speed, true);
  } else if (keysPressed['ArrowRight']) {
    moveRight(player.body, player.body.speed, true);
  } else if (keysPressed['ArrowLeft']) {
    moveLeft(player.body, player.body.speed, true);
  }

  if (keysPressed['mousedown']) {
    attackHandler(player, enemies);
  }
}
