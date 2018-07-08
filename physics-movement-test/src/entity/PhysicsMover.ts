import {
  Bounds, Point,
} from '../engine/types';
import Engine from '../engine/engine';
import Entity from '../engine/entity';
import { drawLine } from '../engine/graphics';

interface PhysicsProperties {
  speed: number;
  maxSpeed: number;
  acceleration: number;
  drag: number;
  heading: number;
}

export default class PhysicsMover extends Entity {

  private physics: PhysicsProperties;
  private dx: number;
  private dy: number;

  constructor(bounds: Bounds, private color: string, initialPhysics: PhysicsProperties) {
    super(bounds);
    
    this.physics = initialPhysics;
    
    this.dx = 0;
    this.dy = 0;
  }
  
  update() {
    this.physics.speed -= this.physics.drag;
    this.physics.speed += this.physics.acceleration;
    
    this.physics.heading += 0.01;
    
    if (this.physics.speed < 0) this.physics.speed = 0;
    if (this.physics.speed > this.physics.maxSpeed) this.physics.speed = this.physics.maxSpeed;
    
    this.dx = this.physics.speed * Math.sin(this.physics.heading);
    this.dy = this.physics.speed * Math.cos(this.physics.heading);
    this.move(this.dx, this.dy);
  }

  draw(ctx: any) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    
    const p1 = new Point(this.bounds.x, this.bounds.y);
    const p2 = new Point(this.bounds.x + (this.dx * this.physics.speed),
      this.bounds.y + (this.dy * this.physics.speed));
    ctx.strokeStyle = 'pink';
    drawLine(ctx, p1, p2);
  }
  
  onCollide(other: Entity) {}

}
