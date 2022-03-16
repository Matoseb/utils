export function screenToWorld(x, y, options) {
  options = {
    pixelDensity: window.devicePixelRatio,
    ctx: undefined,
    matrix: undefined,
    ...options,
  }

  const imatrix = (options.matrix || options.ctx.getTransform()).invertSelf()

  x *= options.pixelDensity
  y *= options.pixelDensity

  return {
    x: x * imatrix.a + y * imatrix.c + imatrix.e,
    y: x * imatrix.b + y * imatrix.d + imatrix.f,
  }
}

export function skew(x, y, { ctx }) {
  return ctx.transform(1, Math.tan(y), Math.tan(x), 1, 0, 0)
}

export function toCanvas(
  source,
  x1 = 0,
  y1 = 0,
  x2 = source.width,
  y2 = source.height
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)

  canvas.width = width
  canvas.height = height

  ctx.drawImage(source, x1, y1, width, height, 0, 0, width, height)

  return canvas
}

// https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
// origPoints = [[x, y], [x, y], [x, y], ...]
export function smoothenPath(origPoints, { tension = 0.5, quality = 16 } = {}) {

  const points = [...origPoints]
  const res = []	// clone array
  points.unshift(origPoints[0]);
  points.push(origPoints[origPoints.length - 1]);

  for (let i = 1; i < points.length - 2; i++) {

    for (let t = 0; t <= quality; t++) {

      const curr = points[i]
      const next1 = points[i + 1]
      const next2 = points[i + 2]
      const prev1 = points[i - 1]
      const t1x = (next1[0] - prev1[0]) * tension;
      const t2x = (next2[0] - curr[0]) * tension;

      const t1y = (next1[1] - prev1[1]) * tension;
      const t2y = (next2[1] - curr[1]) * tension;

      // calc step
      const st = t / quality;

      // calc cardinals
      const c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
      const c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
      const c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
      const c4 = Math.pow(st, 3) - Math.pow(st, 2);

      const x = c1 * curr[0] + c2 * next1[0] + c3 * t1x + c4 * t2x;
      const y = c1 * curr[1] + c2 * next1[1] + c3 * t1y + c4 * t2y;

      //store points in array
      res.push([x, y]);
    }
  }

  return res;
}
