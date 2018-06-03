# js-engine

Attempt at a simple from-scratch game engine for the browser, using TypeScript.


## Usage

See `test-app` for project setup and to serve as an example.

Require `engine` and instantiate with `canvasId` of the `<canvas>` element to draw in, and `handlers` as required for I/O callbacks:

```ts
import Engine from './engine/engine';

const CANVAS_ID: string = 'canvas_engine';

(() => {
  const engine: Engine = new Engine(CANVAS_ID, {
    update: (): void => {},
    draw: (ctx: any) => {},
    mouseMove: (): void => {},
    mouseClick: (): void => {},
    keyDown: (): void => {},
    keyUp: (): void => {}
  });

  engine.begin();
})();

```
