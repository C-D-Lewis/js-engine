const GAME_NAME = 'JS Engine Test';

function Engine(handlers) {
  const self = this;
  self.handlers = handlers;

  self.begin = function() {
    self.canvas = document.getElementById('canvas');

    window.addEventListener('resize', self.resetSize);
    self.resetSize();
    self.loop();
  };

  self.loop = function() {
    window.requestAnimationFrame(self.loop);

    self.handlers.update();

    const ctx = self.canvas.getContext('2d');
    ctx.width = self.width;
    ctx.height = self.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    self.handlers.draw(ctx);
  };

  self.resetSize = function() {
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.canvas.width = window.innerWidth;
    self.canvas.height = window.innerHeight;
  };

  self.begin();
  return self;
}
