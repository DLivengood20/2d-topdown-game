import { AttackHandler } from './attackHandler';
import { Collidable } from './collidable';
import { Enemy } from './enemy';
import { MovementHandler } from './movementHandler';
import { PhysObject } from './physObject';
import { Player } from './player';

export class PlayerHandler {
  static create(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }
    return new Player(ctx, canvas.width / 2, canvas.height / 2, 20, 20, 100);
  }

  static handleAttack(player: Player) {
    if (!player.isStunned && !player.isAttacking) {
      AttackHandler.handleAttack(player);
    }
  }

  static update(player: Player, enemies: Array<Enemy>) {
    player.update(enemies);
    if (!player.isAttacking) {
      const enemyBodies: Array<PhysObject> = [];
      enemies.forEach((enemy) => {
        enemyBodies.push(enemy.body);
      });
      const collision = Collidable.willCollide(player.body, enemyBodies);
      if (collision.length > 0) {
        collision.forEach((enemy: PhysObject) => {
          MovementHandler.knockback(player.body, enemy);
          player.takeDamage(10, true);
        });
      }
    }
  }
}
