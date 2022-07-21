import { Pos } from "./Pos.js";
import { colors } from "./colors.js";

export class Line {
  from: Pos;
  to: Pos;
  color: number;

  constructor(from: Pos, to: Pos, color: number = colors.white) {
    this.from = from;
    this.to = to;
    this.color = color;
  }
}
