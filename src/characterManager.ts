import { attackUpdate } from './attackHandler';
import { applyCollisionReactions } from './collisionUtility';
import { Enemy } from './enemy';
import { Player } from './player';

export function updateCharacters(player: Player, enemies: Array<Enemy>) {
  player.update();
  if (player.isAttacking) {
    attackUpdate(player, enemies);
  }

  applyCollisionReactions(player, enemies);
}
