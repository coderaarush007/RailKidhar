// Rotates the corridor's north-south geographic layout (mockStations x/y,
// laid out portrait: Mumbai low, Delhi high) into a left-to-right landscape
// so RouteMap (passenger) and NetworkMap (admin) share one consistent,
// map-like geography instead of a bare straight line.
const VIEW_W = 900;
const VIEW_H = 420;
const PAD_X = 60;
const PAD_Y = 48;

export const MAP_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;

export function project(station) {
  const nx = 1 - station.y / 780;
  const ny = station.x / 470;
  return {
    x: PAD_X + nx * (VIEW_W - PAD_X * 2),
    y: PAD_Y + ny * (VIEW_H - PAD_Y * 2),
  };
}
