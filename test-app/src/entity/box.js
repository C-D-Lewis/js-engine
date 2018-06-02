function Box(engine, bounds, color, delta) {
  const self = this;

  self.x = bounds[0];
  self.y = bounds[1];
  self.width = bounds[2];
  self.height = bounds[3];
  self.dx = delta;
  self.dy = delta;

  self.update = function() {
    self.x += self.dx;
    self.y += self.dy;

    if (self.x > (engine.width - self.width)) self.dx *= -1;
    if (self.y > (engine.height - self.height)) self.dy *= -1;
    if (self.x < 0) self.dx *= -1;
    if (self.y < 0) self.dy *= -1;
  };

  self.draw = function(ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(self.x, self.y, self.width, self.height);
  };
};

module.exports = Box;
