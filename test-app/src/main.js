const Engine = require('./engine/engine');
const Box = require('./entity/box');

const GAME_NAME = 'js-engine test';
const CANVAS_ID = 'canvas_engine';

let engine, box;

const boxes = [];

const randomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;

const createBox = () => {
  const size = randomInt(10, 200);
  const color = `rgb(${randomInt(10, 230)},${randomInt(10, 230)},${randomInt(10, 230)})`;
  const speed = randomInt(2, 10);
  boxes.push(new Box(engine, [0, 0, size, size], color, speed));
};

(() => {
  console.log(`${GAME_NAME} start`);

  engine = new Engine({
    canvasId: CANVAS_ID,
    handlers: {
      update: () => boxes.forEach(item => item.update()),
      draw: ctx => boxes.forEach(item => item.draw(ctx)),
      mouseMove: () => {},
      mouseClick: () => {},
      keyDown: createBox,
      keyUp: createBox
    }
  });

  for (let i = 0; i < 10; i += 1) {
    createBox();
  }

  engine.begin();
})();
