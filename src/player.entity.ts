import { Entity } from './entity';
import { PhysicalComponent } from './physical.component';
import { RenderComponent } from './render.component';
import { StatusComponent } from './status.component';
import { WeaponComponent } from './weapon.component';

export class PlayerEntity extends Entity {
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent
  ) {
    super(id);
    this.addComponent(physicalComponent);
    this.addComponent(renderComponent);
    this.addComponent(weaponComponent);
    this.addComponent(statusComponent);
  }
}
