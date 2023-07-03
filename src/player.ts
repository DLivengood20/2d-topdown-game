export class Player {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  color: string;
  isStunned: boolean;
  private stunDuration: number;
  private stunTimer: number;
  private stunColor: string;
  private defaultColor: string;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;

    this.defaultColor = 'blue'; // Default player color
    this.color = this.defaultColor;

    this.isStunned = false;
    this.stunDuration = 1000; // Adjust the stun duration as needed (in milliseconds)
    this.stunTimer = 0;
    this.stunColor = 'green'; // Color to indicate player stun
  }

  takeDamage(amount: number, stun?: boolean) {
    this.health -= amount;
    if (stun) {
      this.stun();
    }
  }

  private stun() {
    this.isStunned = true;
    this.stunTimer = Date.now();
  }

  updateStun() {
    const elapsed = Date.now() - this.stunTimer;
    if (elapsed >= this.stunDuration) {
      this.isStunned = false;
      this.color = this.defaultColor;
    } else {
      // Set the player color
      this.color = this.stunColor;
    }
  }

  draw() {
    if (this.context === null) {
      throw new Error('CanvasRenderingContext2D is null.');
    }

    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
