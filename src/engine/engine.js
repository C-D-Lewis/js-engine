function Engine({ handlers, canvasId }) {
  const self = this;
  self.handlers = handlers;

  self.begin = function() {
    self.canvas = document.getElementById(canvasId);

    window.addEventListener('mousemove', self.onMouseMove, false);
    self.canvas.addEventListener('click', self.onMouseClick, false);
    window.addEventListener('resize', self.resetSize, false);
    window.addEventListener('keydown', self.onKeyDown, false);
    window.addEventListener('keyup', self.onKeyUp, false);

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

  self.onMouseMove = function(e) {
    if (!self.handlers.mouseMove) return;

    const boundingRect = self.canvas.getBoundingClientRect();
    self.handlers.mouseMove({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    });
  };

  self.onMouseClick = function(e) {
    if (!self.handlers.mouseClick) return;

    self.handlers.mouseClick({
      x: e.pageX - self.canvas.offsetLeft,
      y: e.pageY - self.canvas.offsetTop
    });
  };

  self.onKeyDown = function(e) {
    if (!self.handlers.keyDown) return;

    self.handlers.keyDown(e.key);
  };

  self.onKeyUp = function(e) {
    if (!self.handlers.keyUp) return;

    self.handlers.keyUp(e.key);
  }

  self.resetSize = function() {
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.canvas.width = window.innerWidth;
    self.canvas.height = window.innerHeight;
  };
}

module.exports = Engine;
