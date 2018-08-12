import { Bounds, Point, PhysicsProps } from '../engine/types';
import { drawLine } from '../engine/graphics';
import { toRadians } from '../engine/util';
import Engine from '../engine/engine';
import Entity from '../engine/entity';

export default class Pawn extends Entity {

  private physics: PhysicsProps;
  
  private dx: number;
  private dy: number;
  private heading: number;
  private targetHeading: number;
  private targetLocation: Point;

  constructor(bounds: Bounds, private color: string, private initialPhysics: PhysicsProps) {
    super(bounds);
    
    this.physics = Object.assign({}, initialPhysics);
    this.dx = 0;
    this.dy = 0;
    this.heading = 0;
    this.targetHeading = 0;
    this.targetLocation = { x: bounds.x, y: bounds.y };
  }
  
  update() {
    // Drag/acceleration
    this.physics.speed -= this.physics.drag;
    this.physics.speed += this.physics.acceleration;
    
    // Heading - TODO: turn to face
    this.updateTargetHeading();
    this.heading = this.targetHeading;
    
    // Arrived at loacation
    this.physics.acceleration = this.isCloseToTargetLocation()
      ? 0
      : this.initialPhysics.acceleration;
      
    if (this.isCloseToTargetLocation()) {
      this.snapToTarget();
    }
    
    // Clamp speed
    if (this.physics.speed < 0) this.physics.speed = 0;
    if (this.physics.speed > this.physics.maxSpeed) this.physics.speed = this.physics.maxSpeed;
    
    // Movement
    this.dx = this.physics.speed * Math.sin(this.heading);
    this.dy = this.physics.speed * Math.cos(this.heading);
    this.move(this.dx, this.dy);
  }

  draw(ctx: any) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    
    this.drawPhysics(ctx);
  }
  
  drawPhysics(ctx: any) {
    // Speed / heading vector
    const origin = { x: this.bounds.x, y: this.bounds.y };
    let p2 = {
      x: this.bounds.x + (this.dx * this.physics.speed),
      y: this.bounds.y + (this.dy * this.physics.speed),
    };
    ctx.strokeStyle = 'pink';
    drawLine(ctx, origin, p2);
    
    // targetHeading vector
    ctx.strokeStyle = 'green';
    const headingDx = 15 * Math.sin(this.targetHeading);
    const headingDy = 15 * Math.cos(this.targetHeading);
    p2 = { x: this.bounds.x + headingDx, y: this.bounds.y + headingDy };
    drawLine(ctx, origin, p2);
    
    // targetLocation vector
    ctx.strokeStyle = 'yellow';
    drawLine(ctx, origin, this.targetLocation);
  }
  
  snapToTarget() {
    this.bounds.x = Math.round(this.bounds.x);
    this.bounds.y = Math.round(this.bounds.y);
  }
  
  isCloseToTargetLocation() {
    return (Math.abs(this.bounds.x - this.targetLocation.x) < (1 * this.bounds.width)) &&
      (Math.abs(this.bounds.y - this.targetLocation.y) < (1 * this.bounds.height));
  }
  
  setTargetLocation(pos: Point) {
    this.targetLocation = pos;
  }
  
  updateTargetHeading() {
    // Always set the targetHeading to the vector from here to the targetLocation
    const dx = this.targetLocation.x - this.bounds.x;
    const dy = this.targetLocation.y - this.bounds.y;
    this.targetHeading = Math.atan2(-dy, dx) - toRadians(-90);
  }
  
  onCollide(other: Entity) {}
}
