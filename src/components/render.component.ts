import { Component } from './component';

/**
 * Represents the rendering properties of an entity in the game.
 * @implements {Component}
 */
export class RenderComponent implements Component {
  /**
   * The default color used for rendering the entity.
   * @type {string}
   */
  defaultColor: string;

  /**
   * The current color used for rendering the entity.
   * @type {string}
   */
  currentColor: string;

  /**
   * The color used for rendering the entity's face.
   * @type {string}
   */
  facingColor: string;

  /**
   * The color used for rendering the entity when it is stunned.
   * @type {string}
   */
  stunColor: string;

  /**
   * Creates an instance of RenderComponent.
   * @param {string} defaultColor - The default color used for rendering the entity.
   * @param {string} facingColor - The color used for rendering the entity's face'.
   * @param {string} stunColor - The color used for rendering the entity when it is stunned.
   */
  constructor(defaultColor: string, facingColor: string, stunColor: string) {
    this.defaultColor = defaultColor;
    this.facingColor = facingColor;
    this.currentColor = defaultColor;
    this.stunColor = stunColor;
  }
}
