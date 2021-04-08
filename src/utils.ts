export function getMouseDegrees(x: number, y: number, degreeLimit: number) {
  let dx = 0;
  let dy = 0;
  let xdiff;
  let xPercentage;
  let ydiff;
  let yPercentage;

  const w = { x: window.innerWidth, y: window.innerHeight };

  if (x <= w.x / 2) {
    xdiff = w.x / 2 - x;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }

  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }

  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

type IVector2 = { x: number; y: number };
interface IMove {
  from: IVector2;
  to: IVector2;
  speed: number;
}
export const move = (arg: IMove) => {
  const movement: IVector2 = {
    x: (arg.from.x - arg.to.y) * arg.speed,
    y: (arg.from.y - arg.to.x) * arg.speed,
  };
  return movement;
};
