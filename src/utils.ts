import { Line } from "./Line.js";
import { Pos } from "./Pos.js";
import { gPlayer } from "./global.js";
import { colors } from "./colors.js";

export function rnd(from: number, to: number) {
  return Math.floor(Math.random() * (from - to)) + to;
}

export function rndPos(width: number, height: number) {
  return {
    x: rnd(0, width),
    y: rnd(0, height),
  };
}

export function d2r(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function r2d(radians: number) {
  return (radians * 180) / Math.PI;
}

export function magnitude(a: number[]) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

export function drawLine(graphics: any, line: Line) {
  graphics
    .lineStyle({
      width: 2,
      color: line.color,
      alignment: 0,
    })
    .moveTo(line.from.x, line.from.y)
    .lineTo(line.to.x, line.to.y);
}

export function getPointFromSourceAngleDistance(
  source: Pos,
  angle: number,
  distance: number
): Pos {
  return {
    x: gPlayer.pos.x + Math.cos(angle) * distance,
    y: gPlayer.pos.y + Math.sin(angle) * distance,
  };
}

export function getIntersectionPoint(
  line1: Line,
  line2: Line
): Pos | undefined {
  const [x1, x2, x3, x4] = [line1.from.x, line1.to.x, line2.from.x, line2.to.x];
  const [y1, y2, y3, y4] = [line1.from.y, line1.to.y, line2.from.y, line2.to.y];
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (d === 0) {
    return undefined;
  }
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
  const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d;

  if (t < 0 || t > 1 || u < 0 || u > 1) {
    return undefined;
  }

  const px = x1 + t * (x2 - x1);
  const py = y1 + t * (y2 - y1);
  return {
    x: px,
    y: py,
  };
}

export function distanceBetweenPoints(a: Pos, b: Pos) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function darkenColorBy(color: number, factor: number) {
  // @ts-ignore
  return PIXI.utils.rgb2hex(PIXI.utils.hex2rgb(color).map((n) => n * factor));
}

export function drawCircle(
  graphics: any,
  pos: Pos,
  color = colors.white,
  radius = 5
) {
  graphics.beginFill(color).drawCircle(pos.x, pos.y, radius).endFill();
}
