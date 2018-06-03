declare const window: any;

export default class Engine {

  private canvas: any;
  private width: number = 0;
  private height: number = 0;

  constructor(canvasId: string, private handlers: any) {
    this.canvas = document.getElementById(canvasId);
  }

  begin(): void {
    const self: Engine = this;

    window.addEventListener('mousemove', (e: any) => self.onMouseMove(e), false);
    this.canvas.addEventListener('click', (e: any) => self.onMouseClick(e), false);
    window.addEventListener('resize', (e: any) => self.resetSize(), false);
    window.addEventListener('keydown', (e: any) => self.onKeyDown(e), false);
    window.addEventListener('keyup', (e: any) => self.onKeyUp(e), false);

    this.resetSize();
    this.loop();
  }

  loop(): void {
    const loopCallback = (): void => this.loop();
    window.requestAnimationFrame(loopCallback);

    this.handlers.update();

    const ctx: any = this.canvas.getContext('2d');
    ctx.width = this.width;
    ctx.height = this.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    this.handlers.draw(ctx);
  }

  onMouseMove(e: any): void {
    if (!this.handlers.mouseMove) return;

    const boundingRect: any = this.canvas.getBoundingClientRect();
    this.handlers.mouseMove({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    });
  }

  onMouseClick(e: any): void {
    if (!this.handlers.mouseClick) return;

    this.handlers.mouseClick({
      x: e.pageX - this.canvas.offsetLeft,
      y: e.pageY - this.canvas.offsetTop
    });
  }

  onKeyDown(e: any): void {
    if (!this.handlers.keyDown) return;

    this.handlers.keyDown(e.key);
  }

  onKeyUp(e: any): void {
    if (!this.handlers.keyUp) return;

    this.handlers.keyUp(e.key);
  }

  resetSize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
