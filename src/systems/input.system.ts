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
  /** Stores the keys currently pressed. */
  keysPressed: { [key: string]: boolean } = {};

  /**
   * Constructs the InputSystem and sets up event listeners for keyboard and mouse input.
   */
  constructor() {
    this.addEventListeners();
  }

  /**
   * Adds event listeners for keyboard and mouse input.
   * @private
   */
  private addEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  /**
   * Handles the keydown event and updates the keysPressed object.
   * @param {KeyboardEvent} event - The keydown event.
   * @private
   */
  private handleKeyDown(event: KeyboardEvent): void {
    this.keysPressed[event.key] = true;
  }

  /**
   * Handles the keyup event and updates the keysPressed object.
   * @param {KeyboardEvent} event - The keyup event.
   * @private
   */
  private handleKeyUp(event: KeyboardEvent): void {
    this.keysPressed[event.key] = false;
  }

  /**
   * Handles the mousedown event and sets the mousedown flag to true.
   * @param {MouseEvent} event - The mousedown event.
   * @private
   */
  private handleMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = true;
    }
  }

  /**
   * Handles the mouseup event and sets the mousedown flag to false.
   * @param {MouseEvent} event - The mouseup event.
   * @private
   */
  private handleMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = false;
    }
  }

  /**
   * Applies user inputs to the player entity.
   * @param {PlayerEntity} player - The player entity.
   * @private
   */
  private applyInputs(player: PlayerEntity): void {
    const statusComponent = player.getComponent(StatusComponent);
    if (!statusComponent || this.shouldSkipInput(statusComponent)) {
      return;
    }

    const physicalComponent = player.getComponent(PhysicalComponent);
    const weaponComponent = player.getComponent(WeaponComponent);

    if (physicalComponent && this.shouldApplyMovement(statusComponent)) {
      this.applyMovement(physicalComponent);
    }

    if (
      weaponComponent &&
      this.shouldAttack(weaponComponent, statusComponent)
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
  private shouldApplyMovement(statusComponent: StatusComponent): boolean {
    return (
      statusComponent.collidedWith.length === 0 &&
      (this.keysPressed['ArrowUp'] ||
        this.keysPressed['ArrowDown'] ||
        this.keysPressed['ArrowRight'] ||
        this.keysPressed['ArrowLeft'])
    );
  }

  /**
   * Applies movement to the physical component based on the keys pressed.
   * @param {PhysicalComponent} physicalComponent - The physical component.
   * @private
   */
  private applyMovement(physicalComponent: PhysicalComponent): void {
    if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowLeft']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.TOP_LEFT,
        true
      );
    } else if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowRight']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.TOP_RIGHT,
        true
      );
    } else if (this.keysPressed['ArrowDown'] && this.keysPressed['ArrowLeft']) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.BOTTOM_LEFT,
        true
      );
    } else if (
      this.keysPressed['ArrowDown'] &&
      this.keysPressed['ArrowRight']
    ) {
      move(
        physicalComponent,
        physicalComponent.diagonalSpeed,
        Directions.BOTTOM_RIGHT,
        true
      );
    } else if (this.keysPressed['ArrowUp']) {
      move(physicalComponent, physicalComponent.speed, Directions.TOP, true);
    } else if (this.keysPressed['ArrowDown']) {
      move(physicalComponent, physicalComponent.speed, Directions.BOTTOM, true);
    } else if (this.keysPressed['ArrowRight']) {
      move(physicalComponent, physicalComponent.speed, Directions.RIGHT, true);
    } else if (this.keysPressed['ArrowLeft']) {
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
    statusComponent: StatusComponent
  ): boolean {
    return (
      this.keysPressed['mousedown'] &&
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
  update(entities: Entity[]): void {
    for (const entity of entities) {
      if (entity.id === 'PLAYER') {
        this.applyInputs(entity);
      }
    }
  }
}
