import { lerp, smoothDamp } from './math'

class Smoother {
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
  setTarget(target) {
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

  update() {
    const { strength, drag } = this.settings

    let force = this.target - this.value
    force *= strength

    this.velocity *= drag
    this.velocity += force

    this.value += this.velocity

    return super.update()
  }
}

export class Lerper extends Smoother {
  constructor(options) {
    super({
      amount: 0.05,
      ...options,
    })
  }

  update() {
    this.value = lerp(this.value, this.target, this.settings.amount)
    return super.update()
  }
}

export class SmoothDamper extends Smoother {
  constructor(options) {
    super({
      smoothness: 1,
      maxSpeed: Infinity,
      ...options,
    })
  }

  update(deltaTime) {
    const { smoothness, maxSpeed } = this.settings
    const results = smoothDamp(this.value, this.target, this.velocity, smoothness, maxSpeed, deltaTime)
    this.value = results.value
    this.velocity = results.velocity
    return super.update()
  }
}
