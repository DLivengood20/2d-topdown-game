import { Entity } from './entity';
import { PhysicalComponent } from './physical.component';
import { StatusComponent } from './status.component';
import { System } from './system';
import { WeaponComponent } from './weapon.component';

export class AttackSystem implements System {
  private getCollidedWithWeapon(
    weaponComponent: WeaponComponent,
    rotation: number,
    x: number,
    y: number,
    distanceFromOrigin: number,
    defenders: Array<Entity>
  ): void {
    const vertexes: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < weaponComponent.length / 10; i++) {
      vertexes.push({
        x:
          -1 *
            Math.sin(rotation) *
            (distanceFromOrigin + weaponComponent.length - 10 * i) +
          x,
        y:
          Math.cos(rotation) *
            (distanceFromOrigin + weaponComponent.length - 10 * i) +
          y,
      });
    }

    for (const defender of defenders) {
      const physicalComponent =
        defender.getComponent<PhysicalComponent>(PhysicalComponent);
      for (const { x, y } of vertexes) {
        if (
          physicalComponent &&
          x <= physicalComponent.x + physicalComponent.width / 2 &&
          x >= physicalComponent.x - physicalComponent.width / 2 &&
          y <= physicalComponent.y + physicalComponent.height / 2 &&
          y >= physicalComponent.y - physicalComponent.height / 2
        ) {
          const statusComponent =
            defender.getComponent<StatusComponent>(StatusComponent);
          if (statusComponent) {
            // TODO: replace with damage value from
            statusComponent.damageTaken += 10;
          }
        }
      }
    }
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      const statusComponent =
        entity.getComponent<StatusComponent>(StatusComponent);
      if (statusComponent?.isAttacking) {
        const weaponComponent =
          entity.getComponent<WeaponComponent>(WeaponComponent);
        const physicalComponent =
          entity.getComponent<PhysicalComponent>(PhysicalComponent);
        if (physicalComponent && weaponComponent) {
          // Copy the current angle of the attacker's body.
          const bodyAngle = physicalComponent.heading;
          // Calculate the angle offset needed to center the weapon swing area.
          const swingAngleOffset = weaponComponent.swingAngle / 2;
          // Calculate the angle offset due to the progression of the swing animation.
          const timeBasedAngleOffset =
            (weaponComponent.swingAngle *
              (Date.now() - statusComponent.attackTimer)) /
            weaponComponent.attackDuration;
          // Combine these angles to determine the current weapon swing angle.
          const weaponAngle =
            bodyAngle + swingAngleOffset - timeBasedAngleOffset;

          const defenders = entities.filter((defender) => defender !== entity);
          this.getCollidedWithWeapon(
            weaponComponent,
            weaponAngle,
            physicalComponent.x,
            physicalComponent.y,
            physicalComponent.width / 2,
            defenders
          );
        }
      }
    }
  }
}
