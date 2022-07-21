import { colors } from "./colors.js";
import { TopView } from "./top-view.js";
import { RenderView } from "./render-view.js";
import { gPlayer } from "./global.js";

// @ts-ignore
const app = new PIXI.Application({
  width: 900,
  height: 400,
  backgroundColor: colors.white,
});

document.body.appendChild(app.view);

const topView = new TopView(app, 400, 400);

const renderView = new RenderView(app, 400, 400);

renderView.container.x = 500;

// Keyboard
function onKeydown(event: any) {
  switch (event.key) {
    case "d":
      gPlayer.move("right");
      break;
    case "s":
      gPlayer.move("down");
      break;
    case "a":
      gPlayer.move("left");
      break;
    case "w":
      gPlayer.move("top");
      break;
    case "e":
      gPlayer.turn("right");
      break;
    case "q":
      gPlayer.turn("left");
      break;
    case "t":
      gPlayer.fov += 0.1;
      break;
    case "z":
      gPlayer.fov -= 0.1;
      break;
  }
  animationUpdate();
  // TODO
}

document.addEventListener("keydown", onKeydown);

// Loop
const FPS = 30;

let last = 0;

const interval = 1000 / FPS;

const animationUpdate = function () {
  const now = performance.now();

  const elapsed = now - last;

  if (elapsed < interval) {
    return;
  }

  topView.draw();

  renderView.draw();

  last = now;
};

animationUpdate();

// app.ticker.add(animationUpdate);
