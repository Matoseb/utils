export function screenToWorld(x, y, options) {

  options = {
    pixelDensity: window.devicePixelRatio,
    ctx: undefined,
    matrix: undefined,
    ...options
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
