import { Character } from './character';
import { getCollidedWithWeapon } from './collisionUtility';

export function initiateAttack(character: Character) {
  const { weapon, attackTimer } = character;
  if (weapon && Date.now() - attackTimer >= weapon.cooldown) {
    character.startAttackTimer();
  }
}

export function updateAttack(attacker: Character, defenders: Array<Character>) {
  if (!attacker.weapon || !attacker.isAttacking) {
    return;
  }

  // Copy the current angle of the attacker's body.
  const bodyAngle = attacker.body.heading;

  // Calculate the angle offset needed to center the weapon swing area.
  const swingAngleOffset = attacker.weapon.swingAngle / 2;

  // Calculate the angle offset due to the progression of the swing animation.
  const timeBasedAngleOffset =
    (attacker.weapon.swingAngle * (Date.now() - attacker.attackTimer)) /
    attacker.weapon.attackDuration;

  // Combine these angles to determine the current weapon swing angle.
  const weaponAngle = bodyAngle + swingAngleOffset - timeBasedAngleOffset;

  const weaponCollisions: Array<Character> = getCollidedWithWeapon(
    attacker.weapon,
    weaponAngle,
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
