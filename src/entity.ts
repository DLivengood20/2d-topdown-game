import { Component } from './component';

export class Entity {
  id: string;
  components: Record<string, Component> = {};

  constructor(id: string) {
    this.id = id;
  }

  addComponent(component: Component) {
    this.components[component.constructor.name] = component;
  }

  getComponent<T>(
    componentConstructor: new (...args: any[]) => T
  ): T | undefined {
    return this.components[componentConstructor.name] as T;
  }
}
