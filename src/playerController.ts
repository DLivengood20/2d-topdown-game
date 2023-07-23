import { MovementHandler as move } from './movementHandler';
import { PlayerHandler } from './playerHandler';
import { Player } from './player';

export class PlayerController {
  static playerInput(keysPressed: { [key: string]: boolean }, player: Player) {
    if (player.isStunned || player.isAttacking) {
      return;
    }
    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      move.upLeft(player.body, player.body.diagonalSpeed, true);
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      move.upRight(player.body, player.body.diagonalSpeed, true);
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      move.bottomLeft(player.body, player.body.diagonalSpeed, true);
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      move.bottomRight(player.body, player.body.diagonalSpeed, true);
    } else if (keysPressed['ArrowUp']) {
      move.up(player.body, player.body.speed, true);
    } else if (keysPressed['ArrowDown']) {
      move.down(player.body, player.body.speed, true);
    } else if (keysPressed['ArrowRight']) {
      move.right(player.body, player.body.speed, true);
    } else if (keysPressed['ArrowLeft']) {
      move.left(player.body, player.body.speed, true);
    }

    if (keysPressed['mousedown']) {
      PlayerHandler.handleAttack(player);
    }
  }
}
