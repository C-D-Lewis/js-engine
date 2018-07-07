import * as Graphics from './graphics';
import { Point } from './types';
import Entity from './entity';

declare const window: any;

export default class Engine {
  
  public width: number = 0;
  public height: number = 0;
  public collisionManager: CollisionManager = new CollisionManager();

  private canvas: any;
  private handlers: any;
  private fpsCounter: FpsCounter = new FpsCounter();
  private firstFrame: boolean = false;
  private paused: boolean = false;

  constructor(private options: any) {
    this.canvas = document.getElementById(options.canvasId);
    this.handlers = options.handlers;
  }

  begin() {
    const self = this;

    window.addEventListener('resize', (e: any) => self.resetSize(), false);
    window.addEventListener('keydown', (e: any) => self.onKeyDown(e), false);
    window.addEventListener('keyup', (e: any) => self.onKeyUp(e), false);
    window.addEventListener('mousemove', (e: any) => self.onMouseMove(e), false);
    this.canvas.addEventListener('click', (e: any) => self.onMouseClick(e), false);

    this.resetSize();
    this.loop();
  }
  
  togglePaused() {
    this.paused = !this.paused;
    
    if (!this.paused) window.requestAnimationFrame(() => this.loop());
  }
  
  loop() {
    if (this.paused) return;
    
    window.requestAnimationFrame(() => this.loop());
    
    const ctx = this.canvas.getContext('2d');
    ctx.width = this.width;
    ctx.height = this.height;

    if (!this.firstFrame && ctx.width != 0) {
      this.firstFrame = true;
      this.handlers.init();
    }

    this.handlers.update();
    this.collisionManager.testAll();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    this.handlers.draw(ctx);

    if (this.options.debug) this.fpsCounter.draw(ctx);
  }

  onMouseMove(e: any) {
    if (!this.handlers.mouseMove) return;

    const boundingRect = this.canvas.getBoundingClientRect();
    this.handlers.mouseMove({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    });
  }

  onMouseClick(e: any) {
    if (!this.handlers.mouseClick) return;

    this.handlers.mouseClick({
      x: e.pageX - this.canvas.offsetLeft,
      y: e.pageY - this.canvas.offsetTop
    });
  }

  onKeyDown(e: any) {
    if (this.handlers.keyDown) this.handlers.keyDown(e.key);
  }

  onKeyUp(e: any) {
    if (!this.handlers.keyUp) this.handlers.keyUp(e.key);
  }

  resetSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

}

class CollisionManager {
  private list: Array<Entity> = [];
  
  add(entity: Entity) {
    this.list.push(entity);
  }
  
  remove(entity: Entity) {
    this.list.splice(this.list.indexOf(entity), 1);
  }
  
  testAll() {
    this.list.forEach((item: Entity) => {
      this.list.forEach((other: Entity) => {
        if (item === other) return;
        if (!item.collidesWith(other)) return;

        item.onCollide(other);
        other.onCollide(item);
      });
    });
  }
  
}

class FpsCounter {
  private lastUpdateTime: number = 0;
  private counter: number = 0;
  private current: number = 0;
  
  draw(ctx: any) {
    const now = new Date().getTime();
    this.counter += 1;
    if ((now - this.lastUpdateTime) > 1000) {
      this.lastUpdateTime = now;
      this.current = this.counter;
      this.counter = 0;
    }

    Graphics.drawText(ctx, `${this.current} FPS`, 'white', new Point(20, 20));
  }
  
}
