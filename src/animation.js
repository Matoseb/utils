import { lerp, smoothDamp, mapClamped, modulo } from './math'
import { Clock } from './time'

export class Smoother {
  constructor(options) {
    this.settings = {
      value: 0,
      target: 0,
      ...options,
    }

    this.velocity = 0
    this.value = this.target = this.settings.value
  }
  update() {
    return this.value
  }
  setTarget(target = this.target) {
    this.target = target
  }
  valueOf() {
    return this.value
  }
}

export class Spring extends Smoother {
  constructor(options) {
    super({
      drag: 0.75,
      strength: 0.1,
      ...options,
    })
  }

  update(target) {
    super.setTarget(target)
    const { strength, drag } = this.settings

    let force = this.target - this.value
    force *= strength

    this.velocity *= drag
    this.velocity += force

    this.value += this.velocity

    return this.value
  }
}

export class Lerper extends Smoother {
  constructor(options) {
    super({
      amount: 0.05,
      ...options,
    })
  }

  update(target) {
    super.setTarget(target)
    this.value = lerp(this.value, this.target, this.settings.amount)
    return this.value
  }
}

export class SmoothDamper extends Smoother {
  constructor(options) {
    super({
      smoothness: 1,
      maxSpeed: Infinity,
      ...options,
    })
    this.clock = new Clock()
  }

  update(target, deltaTime = this.clock.delta()) {
    super.setTarget(target)
    const { smoothness, maxSpeed } = this.settings
    const results = smoothDamp(
      this.value,
      this.target,
      this.velocity,
      smoothness,
      maxSpeed,
      deltaTime
    )
    this.value = results.value
    this.velocity = results.velocity
    return this.value
  }
}

// https://morethandev.hashnode.dev/demystifying-the-cubic-bezier-function-ft-javascript
export function cubicBezier(t, initial, p1, p2, final) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  )
}

function ease(t, easing, tolerance) {
  tolerance *= 0.5
  t = mapClamped(t, tolerance, 1 - tolerance, 0, 1)
  // return (1 - (Math.cos(t * PI) * 0.5 + 0.5))
  return cubicBezier(t, easing, 0, 1 - easing, 1)
}

export function snap(
  value,
  dist,
  { start = 0, tolerance = 0, easing = 0.5 } = {}
) {
  let t = (value + start) / dist
  return (Math.floor(t) + ease(modulo(t, 1), easing, tolerance)) * dist - start
}
