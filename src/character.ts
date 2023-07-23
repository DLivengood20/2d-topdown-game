import { PhysObject } from './physObject';
import { Weapon } from './weapon';

export interface Character {
  body: PhysObject;
  weapon?: Weapon;
  isAttacking: boolean;
  attackTimer: number;
}
