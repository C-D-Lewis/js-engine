import * as Graphics from './graphics';
import { Point } from './types';

declare const window: any;

export default class Engine {

  private canvas: any;
  private handlers: any;
  public width: number = 0;
  public height: number = 0;
  private lastFpsTime: number = 0;
  private fpsCounter: number = 0;
  private fpsCount: number = 0;
  private firstFrame: boolean = false;

  constructor(private options: any) {
    this.canvas = document.getElementById(options.canvasId);
    this.handlers = options.handlers;
  }

  begin() {
    const self: Engine = this;

    window.addEventListener('mousemove', (e: any) => self.onMouseMove(e), false);
    this.canvas.addEventListener('click', (e: any) => self.onMouseClick(e), false);
    window.addEventListener('resize', (e: any) => self.resetSize(), false);
    window.addEventListener('keydown', (e: any) => self.onKeyDown(e), false);
    window.addEventListener('keyup', (e: any) => self.onKeyUp(e), false);

    this.resetSize();
    this.loop();
  }

  drawFps(ctx: any) {
    const now = new Date().getTime();
    this.fpsCounter += 1;
    if (now - this.lastFpsTime > 1000) {
      this.lastFpsTime = now;
      this.fpsCount = this.fpsCounter;
      this.fpsCounter = 0;
    }

    Graphics.drawText(ctx, `${this.fpsCount} FPS`, 'white', new Point(50, 50));
  }

  loop() {
    const loopCallback = () => this.loop();
    window.requestAnimationFrame(loopCallback);

    const ctx: any = this.canvas.getContext('2d');
    ctx.width = this.width;
    ctx.height = this.height;

    if (!this.firstFrame && ctx.width != 0) {
      this.firstFrame = true;
      this.handlers.init();
    }

    this.handlers.update();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    this.handlers.draw(ctx);

    if (this.options.debug) this.drawFps(ctx);
  }

  onMouseMove(e: any) {
    if (!this.handlers.mouseMove) return;

    const boundingRect: any = this.canvas.getBoundingClientRect();
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
    if (!this.handlers.keyDown) return;

    this.handlers.keyDown(e.key);
  }

  onKeyUp(e: any) {
    if (!this.handlers.keyUp) return;

    this.handlers.keyUp(e.key);
  }

  resetSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

}
