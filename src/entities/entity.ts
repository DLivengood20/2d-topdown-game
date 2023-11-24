import { Component } from '../components/component';

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
  constructor(id: string, components?: Component[]) {
    this.id = id;
    if (components) {
      this.addComponents(components);
    }
  }

  /**
   * Adds a component to the entity.
   * @param {Component} component - The component to be added.
   * @returns {Entity} The entity with the added component.
   */
  addComponent(component: Component): Entity {
    const componentName = component.constructor.name;
    if (this.components.has(componentName)) {
      return this;
    }
    this.components.set(componentName, component);
    return this;
  }

  /**
   * Adds an array of components to the entity.
   * @param {Component[]} components - An array of components to be added.
   */
  addComponents(components: Component[]): void {
    for (const component of components) {
      this.addComponent(component);
    }
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
