import { Entity } from './entity';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { WeaponComponent } from '../components/weapon.component';

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
