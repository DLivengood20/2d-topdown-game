import { Character } from './character';
import { CanvasValues } from './constants';
import { Enemy } from './enemy';
import { Player } from './player';
import { Weapon } from './weapon';

export class CanvasController {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private drawCharacter(character: Character) {
    const { x, y, width, height, heading } = character.body;
    const { currentColor, facingColor } = character.renderComponent;
    const { weapon } = character;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(heading);

    this.ctx.fillStyle = currentColor;
    this.ctx.fillRect(-width / 2, -height / 2, width, height);

    this.ctx.fillStyle = facingColor;
    this.ctx.fillRect(-width / 2, height / 2 - 2, width, 2);

    if (weapon && character.isAttacking) {
      const weaponRotation =
        (weapon.swingAngle * (Date.now() - character.attackTimer)) /
        weapon.attackDuration;
      this.drawWeapon(weapon, weaponRotation, character.body.width / 2);
    }

    this.ctx.restore();
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
      -weapon.width / 2,
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
      this.drawCharacter(enemy);
    }

    this.drawCharacter(player);

    // Set the font color to black (or any color that contrasts with the background)
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Health: ${player.getHealth()}`, 10, 30);
  }
}
