export default class Box {

  private dx: number;
  private dy: number;

  constructor(private engine: any, private bounds: number[], private color: string, private delta: number) {
    this.dx = delta;
    this.dy = delta;
  }

  update(): void {
    this.bounds[0] += this.dx;
    this.bounds[1] += this.dy;

    if (this.bounds[0] > (this.engine.width - this.bounds[2])) this.dx *= -1;
    if (this.bounds[1] > (this.engine.height - this.bounds[3])) this.dy *= -1;
    if (this.bounds[0] < 0) this.dx *= -1;
    if (this.bounds[1] < 0) this.dy *= -1;
  }

  draw(ctx: any): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.bounds[0], this.bounds[1], this.bounds[2], this.bounds[3]);
  }
}
