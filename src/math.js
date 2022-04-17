/**
 * Linear interpolation, maps the amount between 0 and 1 to a range between start and stop
 * @param  {number} start
 * @param  {number} stop
 * @param  {number} amount
 * @returns  {number} Returns the mapped value
 */
export function lerp(start, stop, amount) {
  return amount * (stop - start) + start
}

/**
 * Inverse of the lerp() function
 * @param  {number} start
 * @param  {number} stop
 * @param  {number} amount
 * @returns  {number} Returns the value mapped between 0 and 1
 */
export function lerpInv(start, stop, amount) {
  return (amount - start) / (stop - start)
}

// angles
export const TAU = 2 * Math.PI
export const QUARTER_PI = Math.PI * 0.5

export function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

export function toDegrees(radians) {
  return radians * (180 / Math.PI)
}

/**
 * Exponential Lerp, distance between 0.125 and 0.25 is now exactly the same as the distance between 4 and 8
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @author freyaholmer
 * @author khyperia
 * @returns {number}
 */
export function lerpExp(a, b, t) {
  return a * Math.pow(b / a, t)
}

/**
 * Lerp for Scale/Zooming {@link https://gamedev.stackexchange.com/questions/4093/zooming-and-panning-a-camera-simultaneously-causes-a-swooping-effect more}.
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number}
 */
export function lerpScale(a, b, t) {
  return 1 / (t * (1 / b - 1 / a) + 1 / a)
}

export function smoothDamp(
  current,
  target,
  velocity,
  smoothness = 1,
  maxSpeed = Infinity,
  deltaTime = 0
) {
  let num = 2 / (smoothness || 0.00001)
  let num2 = num * deltaTime
  let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2)
  let num4 = current - target
  let num5 = target
  let num6 = maxSpeed * smoothness
  num4 = clamp(num4, -num6, num6)
  target = current - num4
  let num7 = (velocity + num * num4) * deltaTime
  velocity = (velocity - num * num7) * num3
  let value = target + (num4 + num7) * num3
  if (num5 - current > 0 === value > num5) {
    value = num5
    velocity = (value - num5) / deltaTime
  }
  return { value, velocity }
}

export function map(num, start1, stop1, start2, stop2) {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

export function clamp(num, min, max) {
  if (min > max) [min, max] = [max, min]
  return Math.min(Math.max(num, min), max)
}

export function mapClamped(num, start1, stop1, start2, stop2) {
  return map(clamp(num, start1, stop1), start1, stop1, start2, stop2)
}

//modulo operator, same as js remainder. but works with negative numbers.
export function modulo(num, mod) {
  return ((num % mod) + mod) % mod
}

export function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

export function quotient(n, m) {
  return ~~(n / m) * m
}

export function random(a, b) {
  if (arguments.length === 1) {
    if (Array.isArray(a)) {
      const index = Math.floor(random(a.length))

      return a[index]
    } else if (typeof a === 'object') {
      return random(Object.values(a))
    } else if (isNumber(a)) {
      return Math.random() * a
    }
  } else if (arguments.length === 0) {
    return Math.random()
  }

  return Math.random() * (b - a) + a
}

export function isNumber(elem) {
  return !(isNaN(elem) || elem === null)
}
