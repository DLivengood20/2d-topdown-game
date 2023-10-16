import { PhysObject } from './physObject';
import { RenderComponent } from './render.component';
import { Weapon } from './weapon';

export interface Character {
  renderComponent: RenderComponent;
  body: PhysObject;
  weapon?: Weapon;
  isAttacking: boolean;
  attackTimer: number;
  startAttackTimer(): void;
}
