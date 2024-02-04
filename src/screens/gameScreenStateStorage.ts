import { GameScreen } from './gameScreen';

/**
 * Class representing a storage for game screens.
 *
 * @class
 */
export class GameScreenStateStorage {
  /**
   * Array to store game screens.
   *
   * @private
   * @type {GameScreen[]}
   */
  private screens: GameScreen[] = [];

  /**
   * Adds a game screen to the storage.
   *
   * @param {GameScreen} screen - The game screen to add.
   * @returns {this} The current instance for method chaining.
   */
  addScreen(screen: GameScreen): this {
    this.screens.push(screen);
    return this;
  }

  /**
   * Removes a game screen from the storage.
   *
   * @param {GameScreen} screen - The game screen to remove.
   * @returns {this} The current instance for method chaining.
   */
  removeScreen(screen: GameScreen): this {
    this.screens = this.screens.filter((element) => element !== screen);
    return this;
  }

  /**
   * Gets an array of all game screens in the storage.
   *
   * @returns {GameScreen[]} An array of game screens.
   */
  getScreens(): GameScreen[] {
    return this.screens;
  }

  /**
   * Checks if a game screen with a specific name is active in the storage.
   *
   * @param {string} name - The name of the game screen to check.
   * @returns {boolean} True if a matching game screen is active, false otherwise.
   */
  getByName(name: string): boolean {
    return this.screens.some((screen) => screen.name === name);
  }
}
