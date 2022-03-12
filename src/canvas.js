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

export function toCanvas(source, x1 = 0, y1 = 0, x2 = source.width, y2 = source.height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)

  canvas.width = width
  canvas.height = height

  ctx.drawImage(source, x1, y1, width, height, 0, 0, width, height)

  return canvas
}