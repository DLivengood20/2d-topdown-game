import { Enemy } from './enemy';
import { Player } from './player';

export class CollisionCheck {
  static check(player: Player, enemies: Enemy[]) {
    for (let i = 0; i < enemies.length; i++) {
      if (
        enemies[i].x + enemies[i].width / 2 > player.x - player.width / 2 &&
        enemies[i].x - enemies[i].width / 2 < player.x + player.width / 2 &&
        enemies[i].y + enemies[i].height / 2 > player.y - player.height / 2 &&
        enemies[i].y - enemies[i].height / 2 < player.y + player.height / 2
      )
        return true;
    }
    return false;
  }
}
