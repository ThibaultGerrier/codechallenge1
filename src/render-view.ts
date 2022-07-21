import { colors } from "./colors.js";
import { gPlayer, gWorld } from "./global.js";
import {
  darkenColorBy,
  distanceBetweenPoints,
  drawCircle,
  drawLine,
  getIntersectionPoint,
  getPointFromSourceAngleDistance,
} from "./utils.js";
import { Line } from "./Line.js";

export class RenderView {
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
    // @ts-ignore
    this.graphics = new PIXI.Graphics();

    this.container.addChild(this.graphics);
    this.app.stage.addChild(this.container);
  }

  draw() {
    this.drawBackground();
    this.drawWalls();
  }

  drawBackground() {
    this.graphics
      .beginFill(colors.black)
      .drawRect(0, 0, this.width, this.height / 2)
      .endFill();
    this.graphics
      .beginFill(colors.grey)
      .drawRect(0, this.width / 2, this.width, this.height / 2)
      .endFill();
  }

  drawWalls() {
    const deltaAlpha = gPlayer.fov / this.width;
    let alpha = gPlayer.dir - gPlayer.fov / 2;
    for (let i = 0; i <= this.width; i++) {
      alpha += deltaAlpha;
      let closest: any = {
        distance: 999,
      };
      for (const wall of gWorld.walls) {
        const playerLine = new Line(
          getPointFromSourceAngleDistance(gPlayer.pos, alpha, 1000),
          gPlayer.pos
        );
        const intersectionPos = getIntersectionPoint(playerLine, wall);
        if (!intersectionPos) {
          continue;
        }
        const distance = distanceBetweenPoints(gPlayer.pos, intersectionPos);
        if (distance < closest.distance) {
          closest = {
            wall,
            intersectionPos,
            distance,
          };
        }
      }

      if (closest.wall) {
        drawCircle(
          // @ts-ignore
          window.leftGraphics,
          closest.intersectionPos,
          colors.white,
          2
        );
        //const lineHeight = this.height - closest.distance * 0.7;
        const lineHeight = (50 / (1 + closest.distance)) * this.height;
        const line = new Line(
          {
            x: i,
            y: this.height / 2 + lineHeight / 2,
          },
          {
            x: i,
            y: this.height / 2 - lineHeight / 2,
          },
          //closestWall.color
          darkenColorBy(
            closest.wall.color,
            Math.abs(1 - closest.distance / 500)
          )
        );
        drawLine(this.graphics, line);
      }
    }
  }
}
