import { Entity } from '../entities/entity';
import { PhysicalComponent } from '../components/physical.component';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { WeaponComponent } from '../components/weapon.component';

/**
 * Represents a system responsible for handling attacks within the game.
 * @implements {System}
 */
export class AttackSystem implements System {
  /**
   * Handles collisions between the weapon and defending entities.
   * @param {WeaponComponent} weaponComponent - The weapon component of the attacking entity.
   * @param {number} rotation - The rotation angle of the attacking entity.
   * @param {number} x - The x-coordinate of the attacking entity.
   * @param {number} y - The y-coordinate of the attacking entity.
   * @param {number} distanceFromOrigin - The distance from the origin of the weapon swing.
   * @param {Entity[]} defenders - An array of entities potentially being attacked.
   */
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
      const physicalComponent = defender.getComponent(PhysicalComponent);
      for (const { x, y } of vertexes) {
        if (
          physicalComponent &&
          x <= physicalComponent.x + physicalComponent.width / 2 &&
          x >= physicalComponent.x - physicalComponent.width / 2 &&
          y <= physicalComponent.y + physicalComponent.height / 2 &&
          y >= physicalComponent.y - physicalComponent.height / 2
        ) {
          const statusComponent = defender.getComponent(StatusComponent);
          if (statusComponent) {
            // TODO: replace with damage value from weapon when it's implemented
            statusComponent.damageTaken += 10;
          }
        }
      }
    }
  }

  /**
   * Calculates the current angle of the weapon swing.
   * @param {PhysicalComponent} physicalComponent - The physical component of the attacking entity.
   * @param {StatusComponent} statusComponent - The status component of the attacking entity.
   * @param {WeaponComponent} weaponComponent - The weapon component of the attacking entity.
   * @returns {number} The current angle of the weapon swing.
   */
  private getWeaponAngle(
    physicalComponent: PhysicalComponent,
    statusComponent: StatusComponent,
    weaponComponent: WeaponComponent
  ): number {
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
    return bodyAngle + swingAngleOffset - timeBasedAngleOffset;
  }

  /**
   * Updates the state of entities based on their attack status.
   * @param {Entity[]} entities - An array of entities in the game.
   */
  update(entities: Entity[]): void {
    for (const entity of entities) {
      const statusComponent = entity.getComponent(StatusComponent);
      if (statusComponent?.isAttacking) {
        const weaponComponent = entity.getComponent(WeaponComponent);
        const physicalComponent = entity.getComponent(PhysicalComponent);
        if (physicalComponent && weaponComponent) {
          const weaponAngle = this.getWeaponAngle(
            physicalComponent,
            statusComponent,
            weaponComponent
          );

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
