import { Pos } from "./Pos.js";
import { drawLine, getPointFromSourceAngleDistance } from "./utils.js";

export class Player {
  pos: Pos = { x: 0, y: 0 };
  dir: number = 0;
  fov: number = 0;

  constructor(pos: Pos, dir: number, fov: number) {
    this.pos = pos;
    this.dir = dir;
    this.fov = fov;
  }

  setPos(pos: Pos) {
    this.pos = pos;
  }

  move(dir: "right" | "down" | "left" | "top", amount = 10) {
    let angle = this.dir;
    switch (dir) {
      case "right":
        angle += Math.PI / 2;
        break;
      case "down":
        angle += Math.PI;
        break;
      case "left":
        angle -= Math.PI / 2;
        break;
      case "top":
        // same angle
        break;
    }
    this.pos = getPointFromSourceAngleDistance(this.pos, angle, amount);
  }

  turn(dir: "right" | "left", amount = 0.2) {
    switch (dir) {
      case "right":
        this.dir += amount;
        break;
      case "left":
        this.dir -= amount;
        break;
    }
  }
}
