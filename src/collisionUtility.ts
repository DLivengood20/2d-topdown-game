import { PhysObject } from './physObject';
import { CanvasValues } from './constants';
import { Weapon } from './weapon';
import { Character } from './character';
import { Player } from './player';
import { Enemy } from './enemy';
import { knockback } from './movementUtility';

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
  return {
    right: object.x + object.speed + object.width / 2 > CanvasValues.WIDTH,
    left: object.x - object.width / 2 - object.speed < 0,
    top: object.y - object.height / 2 - object.speed < 0,
    bottom: object.y + object.speed + object.height / 2 > CanvasValues.HEIGHT,
  };
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
    for (const { x, y } of vertexes) {
      if (
        x <= defender.body.x + defender.body.width / 2 &&
        x >= defender.body.x - defender.body.width / 2 &&
        y <= defender.body.y + defender.body.height / 2 &&
        y >= defender.body.y - defender.body.height / 2
      ) {
        enemiesHit.push(defender);
      }
    }
  }
  return enemiesHit;
}

export function applyCollisionReactions(player: Player, enemies: Array<Enemy>) {
  const enemyBodies: Array<PhysObject> = enemies.map((enemy) => enemy.body);
  const collision = getCollidedWith(player.body, enemyBodies);

  for (const enemy of collision) {
    knockback(player.body, enemy);
    player.takeDamage(10, true);
  }
}
