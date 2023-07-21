import { Enemy } from './enemy';
import { Weapon } from './weapon';

export class WeaponCollision {
  static weaponCollision(
    weapon: Weapon,
    rotation: number,
    x: number,
    y: number,
    distanceFromOrigin: number,
    enemies: Array<Enemy>
  ) {
    const vertexes: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < weapon.length / 10; i++) {
      vertexes.push({
        x:
          -1 *
            Math.sin(rotation) *
            (distanceFromOrigin + weapon.length - 10 * i) +
          x,
        y:
          Math.cos(rotation) * (distanceFromOrigin + weapon.length - 10 * i) +
          y,
      });
    }

    const enemiesHit: Array<Enemy> = [];

    for (let i = 0; i < enemies.length; i++) {
      for (let j = 0; j < vertexes.length; j++) {
        if (
          vertexes[j].x <= enemies[i].body.x + enemies[i].body.width / 2 &&
          vertexes[j].x >= enemies[i].body.x - enemies[i].body.width / 2 &&
          vertexes[j].y <= enemies[i].body.y + enemies[i].body.height / 2 &&
          vertexes[j].y >= enemies[i].body.y - enemies[i].body.height / 2
        ) {
          enemiesHit.push(enemies[i]);
        }
      }
    }
    return enemiesHit;
  }
}
