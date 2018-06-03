import { Bounds } from '../engine/types';
import Engine from '../engine/engine';
import Entity from '../engine/entity';

export default class Box extends Entity {

  private dx: number;
  private dy: number;

  constructor(engine: Engine, bounds: Bounds, private color: string, private delta: number) {
    super(engine, bounds);

    this.dx = delta;
    this.dy = delta;
  }

  update(): void {
    this.move(this.dx, this.dy);

    if (this.bounds.x > (this.engine.width - this.bounds.width)) this.dx *= -1;
    if (this.bounds.y > (this.engine.height - this.bounds.height)) this.dy *= -1;
    if (this.bounds.x < 0) this.dx *= -1;
    if (this.bounds.y < 0) this.dy *= -1;
  }

  draw(ctx: any): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
  }

}
