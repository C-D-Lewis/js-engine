import { Bounds } from '../engine/types';
import Entity from '../engine/entity';

export default class StaticBox extends Entity {

  constructor(bounds: Bounds, private color: string) {
    super(bounds);
  }

  update() {}

  draw(ctx: any) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
  }

}
