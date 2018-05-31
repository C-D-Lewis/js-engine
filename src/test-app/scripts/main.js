let engine, box;

const boxes = [];

const randomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;

(() => {
  console.log(`${GAME_NAME} start`);

  for (let i = 0; i < 500; i += 1) {
    const size = randomInt(5, 200);
    const r = randomInt(10, 230);
    const g = randomInt(10, 230);
    const b = randomInt(10, 230);
    const color = `rgb(${r},${g},${b})`;
    const speed = randomInt(2, 10);
    boxes.push(new Box([0, 0, size, size], color, speed));
  }

  engine = new Engine({ 
    update: () => boxes.forEach(item => item.update()),
    draw: ctx => boxes.forEach(item => item.draw(ctx))
  });
  engine.begin();
})();