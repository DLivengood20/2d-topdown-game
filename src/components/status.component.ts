import { Component } from './component';
import { Entity } from '../entities/entity';

/**
 * Represents the status properties of an entity in the game.
 * @implements {Component}
 */
export class StatusComponent implements Component {
  /**
   * The health value of the entity.
   * @type {number}
   */
  health: number;

  /**
   * An array of entities with which the current entity has collided.
   * @type {Entity[]}
   */
  collidedWith: Entity[] = [];

  /**
   * The total damage taken by the entity.
   * @type {number}
   */
  damageTaken: number = 0;

  /**
   * Indicates whether the entity is currently stunned.
   * @type {boolean}
   */
  isStunned: boolean = false;

  /**
   * The duration of the stun effect when the entity is stunned.
   * @type {number}
   */
  stunDuration: number;

  /**
   * The timer for tracking the duration of the stun effect.
   * @type {number}
   */
  stunTimer: number = 0;

  /**
   * Indicates whether the entity is currently attacking.
   * @type {boolean}
   */
  isAttacking: boolean = false;

  /**
   * The timer for tracking the duration of the attack action.
   * @type {number}
   */
  attackTimer: number = 0;

  /**
   * The amount of damage this entity causes when colliding with other entities.
   * @type {number}
   */
  collisionDamage: number;

  /**
   * Creates an instance of StatusComponent.
   * @param {number} health - The health value of the entity.
   * @param {number} stunDuration - The duration of the stun effect when the entity is stunned.
   * @param {number} collisionDamage - The amount of damage this entity causes when colliding with other entities.
   */
  constructor(health: number, stunDuration: number, collisionDamage: number) {
    this.health = health;
    this.stunDuration = stunDuration;
    this.collisionDamage = collisionDamage;
  }
}
