import { PhysicalComponent } from '../components/physical.component';
import { RenderComponent } from '../components/render.component';
import { StatusComponent } from '../components/status.component';
import { CharacterEntity } from './character.entity';

export class EnemyEntity extends CharacterEntity {
  constructor(
    id: string,
    physicalComponent: PhysicalComponent,
    renderComponent: RenderComponent,
    statusComponent: StatusComponent
  ) {
    super(id, physicalComponent, renderComponent, statusComponent);
  }
}
