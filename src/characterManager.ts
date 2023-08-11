import { updateAttack } from './attackHandler';
import { applyCollisionReactions } from './collisionUtility';
import { Enemy } from './enemy';
import { Player } from './player';

export function updateCharacters(player: Player, enemies: Array<Enemy>) {
  player.update();
  updateAttack(player, enemies);
  applyCollisionReactions(player, enemies);
}
