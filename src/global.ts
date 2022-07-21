import { Player } from "./Player.js";
import { World } from "./World.js";
import { d2r, rnd, rndPos } from "./utils.js";
import { Line } from "./Line.js";
import { colors, rndColor } from "./colors.js";

const width = 400;
const height = 400;
export const gWorld = new World(400, 400);
export const gPlayer = new Player(
  rndPos(width, height),
  rnd(0, 2 * Math.PI),
  d2r(60)
);

const corners = [
  { x: 1, y: 1 },
  { x: 1, y: height - 1 },
  { x: width - 1, y: height - 1 },
  { x: width - 1, y: 1 },
];
const borderWalls = corners.map(
  (c, i) => new Line(c, corners[(i + 1) % 4], colors.wallGrey)
);
borderWalls.forEach((w) => gWorld.addWall(w));

//gWorld.addWall(line);

const numLines = 5;
for (let i = 0; i < numLines; i++) {
  const line = new Line(
    rndPos(width, height),
    rndPos(width, height),
    rndColor()
  );
  gWorld.addWall(line);
}
