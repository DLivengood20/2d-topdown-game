import { updateAttack } from './attackHandler';
import { applyCollisionReactions } from './collisionUtility';
import { Characters } from './constants';
import { Enemy } from './enemy';
import { Player } from './player';

export class CharacterManager {
  private player: Player;
  private enemies: Array<Enemy>;

  constructor() {
    this.player = Characters.DEFAULT_PLAYER;
    this.enemies = [Characters.ENEMY_1, Characters.ENEMY_2, Characters.ENEMY_3];
  }

  getPlayer(): Player {
    return this.player;
  }

  getEnemies(): Array<Enemy> {
    return this.enemies;
  }

  updateCharacters() {
    this.player.update();
    updateAttack(this.player, this.enemies);
    applyCollisionReactions(this.player, this.enemies);
  }
}
