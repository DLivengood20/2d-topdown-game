import { getCollidedWith } from './collisionUtility';
import { Enemy } from './enemy';
import { knockback } from './movementUtility';
import { PhysObject } from './physObject';
import { Player } from './player';

export function createPlayer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('CanvasRenderingContext2D is null.');
  }
  return new Player(ctx, canvas.width / 2, canvas.height / 2, 20, 20, 100);
}

export function updatePlayer(player: Player, enemies: Array<Enemy>) {
  player.update(enemies);
  const enemyBodies: Array<PhysObject> = enemies.map((enemy) => enemy.body);
  const collision = getCollidedWith(player.body, enemyBodies);

  for (const enemy of collision) {
    knockback(player.body, enemy);
    player.takeDamage(10, true);
  }
}
