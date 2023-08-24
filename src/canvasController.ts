import { CanvasValues } from './constants';
import { Enemy } from './enemy';
import { Player } from './player';
import { Weapon } from './weapon';

export class CanvasController {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private drawPlayer(player: Player) {
    this.ctx.save();
    this.ctx.translate(player.body.x, player.body.y);
    this.ctx.rotate(player.body.heading);

    this.ctx.fillStyle = player.color;
    this.ctx.fillRect(
      (-1 * player.body.width) / 2,
      (-1 * player.body.height) / 2,
      player.body.width,
      player.body.height
    );

    this.ctx.fillStyle = player.faceColor;
    this.ctx.fillRect(
      (-1 * player.body.width) / 2,
      player.body.height / 2 - 2,
      player.body.width,
      2
    );

    if (player.isAttacking) {
      const weaponRotation =
        (player.weapon.swingAngle * (Date.now() - player.attackTimer)) /
        player.weapon.attackDuration;
      this.drawWeapon(player.weapon, weaponRotation, player.body.width / 2);
    }

    this.ctx.restore();
  }

  private drawEnemy(enemy: Enemy) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      enemy.body.x - enemy.body.width / 2,
      enemy.body.y - enemy.body.height / 2,
      enemy.body.width,
      enemy.body.height
    );
  }

  private drawWeapon(
    weapon: Weapon,
    rotation: number,
    distanceFromUser: number
  ) {
    this.ctx.rotate(weapon.swingAngle / 2 - rotation);
    this.ctx.translate(0, weapon.width / 2);

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      (-1 * weapon.width) / 2,
      distanceFromUser,
      weapon.width,
      weapon.length
    );
  }

  private drawBackground() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);

    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0, 0, CanvasValues.WIDTH, CanvasValues.HEIGHT);
  }

  draw(player: Player, enemies: Array<Enemy>) {
    this.drawBackground();
    for (const enemy of enemies) {
      this.drawEnemy(enemy);
    }

    this.drawPlayer(player);

    // Set the font color to black (or any color that contrasts with the background)
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Health: ${player.getHealth()}`, 10, 30);
  }
}
