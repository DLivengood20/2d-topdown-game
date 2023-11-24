import { WeaponComponent } from './weapon.component';

/**
 * Predefined weapon components with default configurations.
 *
 * @enum {WeaponComponent}
 */
export const Weapons = {
  /**
   * Broadsword weapon component with predefined settings.
   *
   * @type {WeaponComponent}
   */
  BROADSWORD: new WeaponComponent(
    20,
    2,
    (90 * Math.PI) / 180,
    200,
    500,
    'black'
  ),

  /**
   * Glaive weapon component with predefined settings.
   *
   * @type {WeaponComponent}
   */
  GLAIVE: new WeaponComponent(30, 2, (30 * Math.PI) / 180, 300, 600, 'black'),

  /**
   * Dagger weapon component with predefined settings.
   *
   * @type {WeaponComponent}
   */
  DAGGER: new WeaponComponent(10, 4, Math.PI, 200, 300, 'black'),
};
