import { Bounds } from './engine/types';
import * as Graphics from './engine/graphics';
import Engine from './engine/engine';
import BouncingBox from './entity/BouncingBox';

let bouncingBox: BouncingBox;

(() => {
  const engine = new Engine({
    canvasId: 'canvas_engine',
    handlers: {
      init: () => {
        bouncingBox = new BouncingBox(engine, new Bounds(0, 0, 100, 100), 'red', 10);
      },
      update: () => {
        bouncingBox.update();
      },
      draw: (ctx: any) => {
        bouncingBox.draw(ctx);
      },
      mouseMove: () => {},
      mouseClick: () => {},
      keyDown: () => {},
      keyUp: () => {},
    },
    debug: true,
  });

  engine.begin();
})();
