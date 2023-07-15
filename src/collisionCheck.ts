import { Enemy } from './enemy';
import { Player } from './player';
import { Weapon } from './weapon';

export class CollisionCheck {
  static enemies(player: Player, enemies: Enemy[]): boolean {
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

  static border(player: Player, canvas: HTMLCanvasElement) {
    const results = { right: false, left: false, top: false, bottom: false };
    // right edge
    if (player.x + player.speed + player.width / 2 > canvas.width) {
      results.right = true;
    }
    // left edge
    if (player.x - player.width / 2 - player.speed < 0) {
      results.left = true;
    }
    // bottom edge
    if (player.y + player.speed + player.height / 2 > canvas.height) {
      results.bottom = true;
    }
    // top edge
    if (player.y - player.height / 2 - player.speed < 0) {
      results.top = true;
    }
    return results;
  }

  static weapon(
    weapon: Weapon,
    rotation: number,
    x: number,
    y: number,
    distanceFromOrigin: number,
    enemies: Array<Enemy>
  ) {
    const vertex = {
      x: -1 * Math.sin(rotation) * (distanceFromOrigin + weapon.length) + x,
      y: Math.cos(rotation) * (distanceFromOrigin + weapon.length) + y,
    };

    const enemiesHit: Array<number> = [];

    for (let i = 0; i < enemies.length; i++) {
      if (
        vertex.x <= enemies[i].x + enemies[i].width / 2 &&
        vertex.x >= enemies[i].x - enemies[i].width / 2 &&
        vertex.y <= enemies[i].y + enemies[i].height / 2 &&
        vertex.y >= enemies[i].y - enemies[i].height / 2
      ) {
        enemiesHit.push(i);
      }
    }
    return enemiesHit;
  }
}
