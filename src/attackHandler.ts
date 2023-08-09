import { Character } from './character';
import { getCollidedWithWeapon } from './collisionUtility';

export function attackHandler(
  attacker: Character,
  defenders: Array<Character>
) {
  if (attacker.weapon === undefined) {
    return;
  }

  attacker.startAttackTimer();

  const weaponRotation =
    attacker.body.heading +
    attacker.weapon.swingAngle / 2 -
    attacker.weapon.swingAngle *
      ((Date.now() - attacker.attackTimer) / attacker.weapon.attackDuration);

  const weaponCollisions: Array<Character> = getCollidedWithWeapon(
    attacker.weapon,
    weaponRotation,
    attacker.body.x,
    attacker.body.y,
    attacker.body.width / 2,
    defenders
  );

  for (const character of weaponCollisions) {
    if (defenders.includes(character)) {
      defenders.splice(defenders.indexOf(character), 1);
    }
  }
}
