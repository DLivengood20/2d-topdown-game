import { Component } from '../components/component';

/*
 * Custom error class for duplicate component errors.
 */
class DuplicateComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateComponentError';
  }
}

/**
 * Represents an entity in the system.
 */
export class Entity {
  /**
   * The unique identifier for the entity.
   */
  id: string;

  /**
   * A map of components associated with the entity.
   */
  components: Map<string, Component> = new Map<string, Component>();

  /**
   * Creates a new entity with the given identifier.
   * @param {string} id - The unique identifier for the entity.
   */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Adds a component to the entity.
   * @param {Component} component - The component to be added.
   * @throws {DuplicateComponentError} If a component of the same type already exists.
   */
  addComponent(component: Component) {
    const componentName = component.constructor.name;
    if (this.components.has(componentName)) {
      this.handleDuplicateComponentError(component);
    }
    this.components.set(componentName, component);
    return this;
  }

  /**
   * Handles the error when attempting to add a duplicate component.
   * @param {Component} component - The component that caused the error.
   * @throws {DuplicateComponentError} Always thrown to indicate the error.
   * @private
   */
  private handleDuplicateComponentError(component: Component): void {
    const componentName = component.constructor.name;
    console.error(`Can't add duplicate component: ${componentName}`);
    throw new DuplicateComponentError(
      `Can't add duplicate component: ${componentName}`
    );
  }

  /**
   * Gets a component of the specified type.
   * @template T - The type of the component.
   * @param {new (...args: any[]) => T} componentConstructor - The constructor of the component type.
   * @returns {T | undefined} The component of the specified type, or undefined if not found.
   */
  getComponent<T>(
    componentConstructor: new (...args: any[]) => T
  ): T | undefined {
    return this.components.get(componentConstructor.name) as T;
  }
}
