import { Entity } from './entity';
import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';

export class EnemyEntity extends Entity {
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent
  ) {
    super(id);
    this.addComponent(physicalComponent);
    this.addComponent(renderComponent);
    this.addComponent(statusComponent);
  }
}
