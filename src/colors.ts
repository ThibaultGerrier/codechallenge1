import { rnd } from "./utils.js";

export const wallColors = {
  red: 0xff0000,
  blue: 0x0000ff,
  yellow: 0xffff00,
  pink: 0xff00ff,
  cyan: 0x00ffff,
  green: 0x00ff00,
};

export const colors = {
  white: 0xffffff,
  grey: 0x5a5c55,
  wallGrey: 0x2b3d36,
  black: 0x000000,
  ...wallColors,
};

const colorsValues = Object.values(wallColors);

export function rndColor() {
  const idx = rnd(0, colorsValues.length - 1);
  return colorsValues[idx];
}
