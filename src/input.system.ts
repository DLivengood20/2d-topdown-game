import { Entity } from './entity';
import {
  moveBottomLeft,
  moveBottomRight,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  moveUpLeft,
  moveUpRight,
} from './movementUtility';
import { PhysicalComponent } from './physical.component';
import { PlayerEntity } from './player.entity';
import { StatusComponent } from './status.component';
import { System } from './system';
import { WeaponComponent } from './weapon.component';

export class InputSystem implements System {
  keysPressed: { [key: string]: boolean } = {};
  constructor() {
    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keysPressed[event.key] = false;
    });

    document.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        this.keysPressed['mousedown'] = true;
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        this.keysPressed['mousedown'] = false;
      }
    });
  }

  applyInputs(player: PlayerEntity) {
    const statusComponent =
      player.getComponent<StatusComponent>(StatusComponent);

    const physicalComponent =
      player.getComponent<PhysicalComponent>(PhysicalComponent);

    if (
      statusComponent &&
      (statusComponent.isStunned || statusComponent.isAttacking)
    ) {
      return;
    }

    if (physicalComponent && statusComponent?.collidedWith.length === 0) {
      if (this.keysPressed['ArrowUp'] && this.keysPressed['ArrowLeft']) {
        moveUpLeft(physicalComponent, physicalComponent.diagonalSpeed, true);
      } else if (
        this.keysPressed['ArrowUp'] &&
        this.keysPressed['ArrowRight']
      ) {
        moveUpRight(physicalComponent, physicalComponent.diagonalSpeed, true);
      } else if (
        this.keysPressed['ArrowDown'] &&
        this.keysPressed['ArrowLeft']
      ) {
        moveBottomLeft(
          physicalComponent,
          physicalComponent.diagonalSpeed,
          true
        );
      } else if (
        this.keysPressed['ArrowDown'] &&
        this.keysPressed['ArrowRight']
      ) {
        moveBottomRight(
          physicalComponent,
          physicalComponent.diagonalSpeed,
          true
        );
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

    if (this.keysPressed['mousedown']) {
      const weaponComponent =
        player.getComponent<WeaponComponent>(WeaponComponent);
      const statusComponent =
        player.getComponent<StatusComponent>(StatusComponent);
      if (
        weaponComponent &&
        statusComponent &&
        Date.now() - statusComponent.attackTimer >= weaponComponent.cooldown
      ) {
        statusComponent.isAttacking = true;
        statusComponent.attackTimer = Date.now();
        setTimeout(
          () => (statusComponent.isAttacking = false),
          weaponComponent.attackDuration
        );
      }
    }
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      if (entity.id === 'PLAYER') {
        this.applyInputs(entity);
      }
    }
  }
}
