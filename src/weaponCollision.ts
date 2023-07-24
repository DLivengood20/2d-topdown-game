import { Character } from './character';
import { Weapon } from './weapon';

export function weaponCollision(
  weapon: Weapon,
  rotation: number,
  x: number,
  y: number,
  distanceFromOrigin: number,
  defenders: Array<Character>
) {
  const vertexes: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < weapon.length / 10; i++) {
    vertexes.push({
      x:
        -1 *
          Math.sin(rotation) *
          (distanceFromOrigin + weapon.length - 10 * i) +
        x,
      y: Math.cos(rotation) * (distanceFromOrigin + weapon.length - 10 * i) + y,
    });
  }

  const enemiesHit: Array<Character> = [];

  for (let i = 0; i < defenders.length; i++) {
    for (let j = 0; j < vertexes.length; j++) {
      if (
        vertexes[j].x <= defenders[i].body.x + defenders[i].body.width / 2 &&
        vertexes[j].x >= defenders[i].body.x - defenders[i].body.width / 2 &&
        vertexes[j].y <= defenders[i].body.y + defenders[i].body.height / 2 &&
        vertexes[j].y >= defenders[i].body.y - defenders[i].body.height / 2
      ) {
        enemiesHit.push(defenders[i]);
      }
    }
  }
  return enemiesHit;
}
