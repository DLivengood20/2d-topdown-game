import { Character } from './character';
import { WeaponCollision as collision } from './weaponCollision';

export function attackHandler(
  attacker: Character,
  defenders: Array<Character>
) {
  if (attacker.weapon === undefined) {
    return;
  }

  if (Date.now() - attacker.attackTimer >= attacker.weapon.cooldown) {
    attacker.isAttacking = true;
    attacker.attackTimer = Date.now();
  }

  const elapsed = Date.now() - attacker.attackTimer;
  if (elapsed >= attacker.weapon.attackDuration) {
    attacker.isAttacking = false;
  }
  const weaponRotation =
    attacker.body.heading +
    attacker.weapon.swingAngle / 2 -
    attacker.weapon.swingAngle *
      ((Date.now() - attacker.attackTimer) / attacker.weapon.attackDuration);

  const weaponCollision = collision.weaponCollision(
    attacker.weapon,
    weaponRotation,
    attacker.body.x,
    attacker.body.y,
    attacker.body.width / 2,
    defenders
  );

  if (weaponCollision.length > 0) {
    for (let i = 0; i < defenders.length; i++) {
      for (let j = 0; j < weaponCollision.length; j++) {
        if (defenders[i] === weaponCollision[j]) {
          defenders.splice(i, 1);
        }
      }
    }
  }
}
