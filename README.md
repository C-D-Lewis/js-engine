# js-engine

Attempt at a simple from-scratch game engine for the browser.


## Usage

See `test-app` for project setup and to serve as an example.

Require `engine.js` and instantiate with `canvasId` of the `<canvas>` element to draw in, and `handlers` as required for I/O callbacks:

```js
const Engine = require('./engine/engine');

(() => {
  const engine = new Engine({
    canvasId: '',
    handlers: {
      update: () => {},
      draw: ctx => {},
      mouseMove: pos => {},
      mouseClick: pos => {},
      keyDown: key => {},
      keyUp: key => {}
    }
  });
  
  // Set up other stuff
  
  engine.begin();
})();
```
