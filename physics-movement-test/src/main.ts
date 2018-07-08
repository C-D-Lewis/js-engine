import { Bounds } from './engine/types';
import Engine from './engine/engine';
import PhysicsMover from './entity/PhysicsMover';

let mover: PhysicsMover;

const toRadians = (angle: number) => angle * (Math.PI / 180);

(() => {
  const engine = new Engine({
    init: () => {
      mover = new PhysicsMover(new Bounds(10, 10, 30, 30), 'red', {
        speed: 1,
        acceleration: 0.5,
        drag: 0.01,
        heading: toRadians(45),
        maxSpeed: 5,
      });
    },
    update: () => {
      mover.update();
    },
    draw: (ctx: any) => {
      mover.draw(ctx);
    },
    mouseMove: () => {},
    mouseClick: () => {},
    keyDown: (key: string) => {
      if (key === 'p') engine.togglePaused();
    },
    keyUp: () => {},
    debug: true,
  });

  engine.begin();
})();
