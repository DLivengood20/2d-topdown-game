import { PhysObject } from './physObject';
import { CanvasValues } from './constants';
import { Weapon } from './weapon';
import { Character } from './character';

export function getCollidedWith(
  object: PhysObject,
  objects: Array<PhysObject>
): Array<PhysObject> {
  const results: Array<PhysObject> = [];
  for (const collidable of objects) {
    if (
      collidable.x + collidable.width / 2 > object.x - object.width / 2 &&
      collidable.x - collidable.width / 2 < object.x + object.width / 2 &&
      collidable.y + collidable.height / 2 > object.y - object.height / 2 &&
      collidable.y - collidable.height / 2 < object.y + object.height / 2
    ) {
      results.push(collidable);
    }
  }
  return results;
}

export function getCanvasEdgeCollision(object: PhysObject): {
  right: boolean;
  left: boolean;
  top: boolean;
  bottom: boolean;
} {
  const results = { right: false, left: false, top: false, bottom: false };
  // right edge
  if (object.x + object.speed + object.width / 2 > CanvasValues.Width) {
    results.right = true;
  }
  // left edge
  if (object.x - object.width / 2 - object.speed < 0) {
    results.left = true;
  }
  // bottom edge
  if (object.y + object.speed + object.height / 2 > CanvasValues.Height) {
    results.bottom = true;
  }
  // top edge
  if (object.y - object.height / 2 - object.speed < 0) {
    results.top = true;
  }
  return results;
}

export function getCollidedWithWeapon(
  weapon: Weapon,
  rotation: number,
  x: number,
  y: number,
  distanceFromOrigin: number,
  defenders: Array<Character>
): Array<Character> {
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

  for (const defender of defenders) {
    for (const vertex of vertexes) {
      if (
        vertex.x <= defender.body.x + defender.body.width / 2 &&
        vertex.x >= defender.body.x - defender.body.width / 2 &&
        vertex.y <= defender.body.y + defender.body.height / 2 &&
        vertex.y >= defender.body.y - defender.body.height / 2
      ) {
        enemiesHit.push(defender);
      }
    }
  }
  return enemiesHit;
}
