import { clamp } from './math'

export class Spring {
  constructor(options = {}) {
    this.settings = {
      position: 0,
      drag: 0.75,
      strength: 0.1,
      ...options,
    }

    this.velocity = 0
    this.position = this.target = this.settings.position
  }

  follow(target) {
    this.target = target
  }

  update(target = this.target) {
    const { strength, drag } = this.settings

    let force = target - this.position
    force *= strength

    this.velocity *= drag
    this.velocity += force

    this.position += this.velocity

    return this.position
  }

  valueOf() {
    return this.position
  }
}

export class SmoothDamper {
  constructor(options = {}) {
    this.settings = {
      value: 0,
      smoothness: 1,
      maxSpeed: Infinity,
      ...options,
    }

    this.velocity = 0
    this.value = this.settings.value
  }

  setTarget(target) {
    this.target = target
  }

  update(deltaTime) {
    this.value = this.smoothDamp(this.value, this.target, deltaTime)
    return this.value
  }

  valueOf() {
    return this.value
  }

  smoothDamp(
    current,
    target,
    deltaTime
  ) {
    const { smoothness, maxSpeed } = this.settings
    let num = 2 / (smoothness || 0.00001);
    let num2 = num * deltaTime;
    let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
    let num4 = current - target;
    let num5 = target;
    let num6 = maxSpeed * smoothness;
    num4 = clamp(num4, -num6, num6);
    target = current - num4;
    let num7 = (this.velocity + num * num4) * deltaTime;
    this.velocity = (this.velocity - num * num7) * num3;
    let num8 = target + (num4 + num7) * num3;
    if (num5 - current > 0 === num8 > num5) {
      num8 = num5;
      this.velocity = (num8 - num5) / deltaTime;
    }
    return num8;
  }
}
