import { Entity } from '../entities/entity';
import {
  moveBottomLeft,
  moveBottomRight,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  moveUpLeft,
  moveUpRight,
} from '../movementUtility';
import { PhysicalComponent } from '../components/physical.component';
import { PlayerEntity } from '../entities/player.entity';
import { StatusComponent } from '../components/status.component';
import { System } from './system';
import { WeaponComponent } from '../components/weapon.component';

export class InputSystem implements System {
  keysPressed: { [key: string]: boolean } = {};
  constructor() {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.keysPressed[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.keysPressed[event.key] = false;
  }

  private handleMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = true;
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.keysPressed['mousedown'] = false;
    }
  }

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

  private shouldSkipInput(statusComponent: StatusComponent): boolean {
    return statusComponent.isStunned || statusComponent.isAttacking;
  }

  private shouldApplyMovement(statusComponent: StatusComponent): boolean {
    return (
      statusComponent.collidedWith.length === 0 &&
      (this.keysPressed['ArrowUp'] ||
        this.keysPressed['ArrowDown'] ||
        this.keysPressed['ArrowRight'] ||
        this.keysPressed['ArrowLeft'])
    );
  }

  private applyMovement(physicalComponent: PhysicalComponent): void {
    if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowLeft']) {
      moveUpLeft(physicalComponent, physicalComponent.diagonalSpeed, true);
    } else if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowRight']) {
      moveUpRight(physicalComponent, physicalComponent.diagonalSpeed, true);
    } else if (this.keysPressed['ArrowDown'] && this.keysPressed['ArrowLeft']) {
      moveBottomLeft(physicalComponent, physicalComponent.diagonalSpeed, true);
    } else if (
      this.keysPressed['ArrowDown'] &&
      this.keysPressed['ArrowRight']
    ) {
      moveBottomRight(physicalComponent, physicalComponent.diagonalSpeed, true);
    } else if (this.keysPressed['ArrowUp']) {
      moveUp(physicalComponent, physicalComponent.speed, true);
    } else if (this.keysPressed['ArrowDown']) {
      moveDown(physicalComponent, physicalComponent.speed, true);
    } else if (this.keysPressed['ArrowRight']) {
      moveRight(physicalComponent, physicalComponent.speed, true);
    } else if (this.keysPressed['ArrowLeft']) {
      moveLeft(physicalComponent, physicalComponent.speed, true);
    }
  }

  private shouldAttack(
    weaponComponent: WeaponComponent,
    statusComponent: StatusComponent
  ): boolean {
    return (
      this.keysPressed['mousedown'] &&
      Date.now() - statusComponent.attackTimer >= weaponComponent.cooldown
    );
  }

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

  update(entities: Entity[]): void {
    for (const entity of entities) {
      if (entity.id === 'PLAYER') {
        this.applyInputs(entity);
      }
    }
  }
}
