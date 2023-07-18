import { Enemy } from './enemy';
import { Player } from './player';
import { CollisionCheck as collision } from './collisionCheck';

export class AttackHandler {
  isAttacking: boolean;
  attackTimer: number;

  constructor() {
    this.isAttacking = false;
    this.attackTimer = 0;
  }

  handleAttack(keysPressed: { [key: string]: boolean }, player: Player) {
    if (
      keysPressed['mousedown'] &&
      Date.now() - this.attackTimer >= player.weapon.cooldown
    ) {
      this.attack();
    }
  }

  attack() {
    this.isAttacking = true;
    this.attackTimer = Date.now();
  }

  update(player: Player, enemies: Array<Enemy>) {
    const elapsed = Date.now() - this.attackTimer;
    if (elapsed >= player.weapon.attackDuration) {
      this.isAttacking = false;
    }
    const weaponRotation =
      player.move.heading +
      player.weapon.swingAngle / 2 -
      player.weapon.swingAngle *
        ((Date.now() - this.attackTimer) / player.weapon.attackDuration);

    const weaponCollision = collision.weapon(
      player.weapon,
      weaponRotation,
      player.move.x,
      player.move.y,
      player.move.width / 2,
      enemies
    );

    if (weaponCollision.length > 0) {
      for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < weaponCollision.length; j++) {
          if (enemies[i] === weaponCollision[j]) {
            enemies.splice(i, 1);
          }
        }
      }
    }
  }
}
