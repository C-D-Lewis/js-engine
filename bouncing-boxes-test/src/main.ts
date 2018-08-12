import { Bounds } from './engine/types';
import Engine from './engine/engine';
import BouncingBox from './entity/BouncingBox';

let bouncingBox: BouncingBox;
let bouncingBox2: BouncingBox;

const randomInt = (max: number) => Math.round(Math.random() * max);

(() => {
  const engine = new Engine({
    init: () => {
      bouncingBox = new BouncingBox(engine, new Bounds(randomInt(500), randomInt(400), 100, 100), 'red', 2);
      bouncingBox2 = new BouncingBox(engine, new Bounds(randomInt(200), randomInt(200), 50, 50), 'blue', 5);
      
      engine.collisionManager.add(bouncingBox);
      engine.collisionManager.add(bouncingBox2);
    },
    update: () => {
      bouncingBox.update();
      bouncingBox2.update();
    },
    draw: (ctx: any) => {
      bouncingBox.draw(ctx);
      bouncingBox2.draw(ctx);
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
