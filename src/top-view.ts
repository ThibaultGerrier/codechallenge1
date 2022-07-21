import { gPlayer, gWorld } from "./global.js";
import { colors } from "./colors.js";
import {
  drawCircle,
  drawLine,
  getPointFromSourceAngleDistance,
} from "./utils.js";
import { Line } from "./Line.js";

export class TopView {
  app: any;
  container: any;
  graphics: any;
  width: number;
  height: number;

  constructor(app: any, width: number, height: number) {
    this.setupPIXI(app);
    this.height = height;
    this.width = width;
  }

  setupPIXI(app: any) {
    this.app = app;

    // @ts-ignore
    this.container = new PIXI.Container();
    this.container.interactive = true;
    // @ts-ignore
    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true;
    // @ts-ignore
    window.leftGraphics = this.graphics;

    this.container.addChild(this.graphics);
    this.app.stage.addChild(this.container);
  }

  draw() {
    this.background();

    this.drawWalls();

    this.drawGuy();
  }

  background() {
    this.graphics
      .lineStyle(0)
      .beginFill(colors.black)
      .drawRect(0, 0, this.width - 1, this.height - 1)
      .endFill();
  }

  drawWalls() {
    gWorld.walls.forEach((wall) => {
      drawLine(this.graphics, wall);
    });
  }

  drawGuy() {
    drawCircle(this.graphics, gPlayer.pos, colors.green, 5);

    const fovLength = 20;
    const alpha1 = gPlayer.dir + gPlayer.fov / 2;
    const alpha2 = gPlayer.dir - gPlayer.fov / 2;

    const fovPoint1 = getPointFromSourceAngleDistance(
      gPlayer.pos,
      alpha1,
      fovLength
    );
    const fovPoint2 = getPointFromSourceAngleDistance(
      gPlayer.pos,
      alpha2,
      fovLength
    );

    drawLine(this.graphics, new Line(gPlayer.pos, fovPoint1, colors.white));
    drawLine(this.graphics, new Line(gPlayer.pos, fovPoint2, colors.white));
  }
}
