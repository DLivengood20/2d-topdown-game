import { Enemy } from './enemy';
import { Player } from './player';

export class CollisionCheck {
  static check(player: Player, enemies: Enemy[]) {
    for (let i = 0; i < enemies.length; i++) {
      if (
        enemies[i].x < player.x + player.width &&
        enemies[i].x + enemies[i].width > player.x &&
        enemies[i].y < player.y + player.height &&
        enemies[i].y + enemies[i].height > player.y
      )
        return true;
    }
    return false;
  }
}
