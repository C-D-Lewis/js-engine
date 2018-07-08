import * as Graphics from './graphics';
import { Point } from './types';
import Entity from './entity';

declare const window: any;

export default class Engine {
  
  public width: number = 0;
  public height: number = 0;
  public collisionManager: CollisionManager = new CollisionManager();

  private canvas: any;
  private fpsCounter: FpsCounter = new FpsCounter();
  private firstFrame: boolean = false;
  private paused: boolean = false;

  constructor(private options: any) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.margin = 0;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.position = 'absolute';
    document.body.appendChild(this.canvas);
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
      this.options.init();
    }

    this.options.update();
    this.collisionManager.testAll();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    this.options.draw(ctx);

    if (this.options.debug) this.fpsCounter.draw(ctx);
  }

  onMouseMove(e: any) {
    if (!this.options.mouseMove) return;

    const boundingRect = this.canvas.getBoundingClientRect();
    this.options.mouseMove({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    });
  }

  onMouseClick(e: any) {
    if (!this.options.mouseClick) return;

    this.options.mouseClick({
      x: e.pageX - this.canvas.offsetLeft,
      y: e.pageY - this.canvas.offsetTop
    });
  }

  onKeyDown(e: any) {
    if (this.options.keyDown) this.options.keyDown(e.key);
  }

  onKeyUp(e: any) {
    if (!this.options.keyUp) this.options.keyUp(e.key);
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
