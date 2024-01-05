import { Entity } from '../entities/entity';
import { move } from '../movementUtility';
import { PhysicalComponent } from '../components/physical.component';
import { PlayerEntity } from '../entities/player.entity';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { WeaponComponent } from '../components/weapon.component';
import { Directions } from '../constants';

/**
 * System handling user input for player entities.
 *
 * @implements {System}
 */
export class InputSystem implements System {
  /**
   * Applies user inputs to the player entity.
   * @param {PlayerEntity} player - The player entity.
   * @private
   */
  private applyInputs(
    player: PlayerEntity,
    keysPressed: { [key: string]: boolean }
  ): void {
    const statusComponent = player.getComponent(StatusComponent);
    if (!statusComponent || this.shouldSkipInput(statusComponent)) {
      return;
    }

    const physicalComponent = player.getComponent(PhysicalComponent);
    const weaponComponent = player.getComponent(WeaponComponent);

    if (
      physicalComponent &&
      this.shouldApplyMovement(statusComponent, keysPressed)
    ) {
      this.applyMovement(physicalComponent, keysPressed);
    }

    if (
      weaponComponent &&
      this.shouldAttack(weaponComponent, statusComponent, keysPressed)
    ) {
      this.attack(weaponComponent, statusComponent);
    }
  }

  /**
   * Checks if user input should be skipped based on the status component.
   * @param {StatusComponent} statusComponent - The status component.
   * @returns {boolean} True if input should be skipped, otherwise false.
   * @private
   */
  private shouldSkipInput(statusComponent: StatusComponent): boolean {
    return statusComponent.isStunned || statusComponent.isAttacking;
  }

  /**
   * Checks if movement should be applied based on the status component and keys pressed.
   * @param {StatusComponent} statusComponent - The status component.
   * @returns {boolean} True if movement should be applied, otherwise false.
   * @private
   */
  private shouldApplyMovement(
    statusComponent: StatusComponent,
    keysPressed: { [key: string]: boolean }
  ): boolean {
    return (
      statusComponent.collidedWith.length === 0 &&
      (keysPressed['ArrowUp'] ||
        keysPressed['ArrowDown'] ||
        keysPressed['ArrowRight'] ||
        keysPressed['ArrowLeft'])
    );
  }

  /**
   * Applies movement to the physical component based on the keys pressed.
   * @param {PhysicalComponent} physicalComponent - The physical component.
   * @private
   */
  private applyMovement(
    physicalComponent: PhysicalComponent,
    keysPressed: { [key: string]: boolean }
  ): void {
    if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.TOP_LEFT,
        true
      );
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.TOP_RIGHT,
        true
      );
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.BOTTOM_LEFT,
        true
      );
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.BOTTOM_RIGHT,
        true
      );
    } else if (keysPressed['ArrowUp']) {
      move(physicalComponent, physicalComponent.speed, Directions.TOP, true);
    } else if (keysPressed['ArrowDown']) {
      move(physicalComponent, physicalComponent.speed, Directions.BOTTOM, true);
    } else if (keysPressed['ArrowRight']) {
      move(physicalComponent, physicalComponent.speed, Directions.RIGHT, true);
    } else if (keysPressed['ArrowLeft']) {
      move(physicalComponent, physicalComponent.speed, Directions.LEFT, true);
    }
  }

  /**
   * Checks if the player should attack based on the keys pressed and weapon cooldown.
   * @param {WeaponComponent} weaponComponent - The weapon component.
   * @param {StatusComponent} statusComponent - The status component.
   * @returns {boolean} True if the player should attack, otherwise false.
   * @private
   */
  private shouldAttack(
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent,
    keysPressed: { [key: string]: boolean }
  ): boolean {
    return (
      keysPressed['mousedown'] &&
      Date.now() - statusComponent.attackTimer >= weaponComponent.cooldown
    );
  }

  /**
   * Initiates an attack by setting the attack flag and resetting the attack timer.
   * @param {WeaponComponent} weaponComponent - The weapon component.
   * @param {StatusComponent} statusComponent - The status component.
   * @private
   */
  private attack(
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent
  ): void {
    statusComponent.isAttacking = true;
    statusComponent.attackTimer = Date.now();
    setTimeout(
      () => (statusComponent.isAttacking = false),
      weaponComponent.attackDuration
    );
  }

  /**
   * Updates the input system by applying inputs to the player entity.
   * @param {Entity[]} entities - The array of entities.
   */
  update(entities: Entity[], keysPressed: { [key: string]: boolean }): void {
    for (const entity of entities) {
      if (entity.id === 'PLAYER') {
        this.applyInputs(entity, keysPressed);
      }
    }
  }
}
