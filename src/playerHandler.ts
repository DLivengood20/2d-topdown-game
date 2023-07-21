import { AttackHandler } from './attackHandler';
import { Enemy } from './enemy';
import { MovementHandler } from './movementHandler';
import { PhysObject } from './physObject';
import { Player } from './player';

export class PlayerHandler {
  private attack: AttackHandler = new AttackHandler();
  create(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }
    return new Player(
      ctx,
      this.attack,
      canvas.width / 2,
      canvas.height / 2,
      20,
      20,
      100
    );
  }

  update(
    keysPressed: { [key: string]: boolean },
    canvas: HTMLCanvasElement,
    player: Player,
    enemies: Array<Enemy>
  ) {
    player.update(enemies);
    if (!player.isStunned && !this.attack.isAttacking) {
      this.attack.handleAttack(keysPressed, player);
      if (!this.attack.isAttacking) {
        const enemyBodies: Array<PhysObject> = [];
        enemies.forEach((enemy) => {
          enemyBodies.push(enemy.body);
        });
        const collision = player.body.collidable.collide(
          player.body,
          enemyBodies
        );
        if (collision.length > 0) {
          collision.forEach((enemy) => {
            MovementHandler.knockback(player.body, enemy);
            player.takeDamage(10, true);
          });
        } else {
          const borderCollision = player.body.collidable.border(
            player.body,
            player.body.move.speed,
            canvas
          );
          MovementHandler.handleMovement(
            keysPressed,
            player.body,
            borderCollision
          );
        }
      }
    }
  }
}
