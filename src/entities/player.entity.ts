import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { WeaponComponent } from '../components/weapon.component';
import { CharacterEntity } from './character.entity';

export class PlayerEntity extends CharacterEntity {
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent,
    weaponComponent: WeaponComponent
  ) {
    super(
      id,
      physicalComponent,
      renderComponent,
      statusComponent,
      weaponComponent
    );
  }
}
