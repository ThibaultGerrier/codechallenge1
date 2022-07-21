import { Line } from "./Line.js";

export class World {
  height: number;
  width: number;
  walls: Line[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.walls = [];
  }

  addWall = (line: Line) => {
    this.walls.push(line);
  };
}
