import { Component } from './component';
import { Entity } from '../entities/entity';

export class StatusComponent implements Component {
  health: number;
  collidedWith: Entity[] = [];
  damageTaken: number = 0;
  isStunned: boolean = false;
  stunDuration: number;
  stunTimer: number = 0;
  isAttacking: boolean = false;
  attackTimer: number = 0;
  collisionDamage: number;

  constructor(health: number, stunDuration: number, collisionDamage: number) {
    this.health = health;
    this.stunDuration = stunDuration;
    this.collisionDamage = collisionDamage;
  }
}
