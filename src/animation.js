export class Spring {
  constructor(options = {}) {
    this.settings = {
      position: 0,
      drag: 0.75,
      strength: 0.1,
      ...options
    }

    this.velocity = 0
    this.position = this.target = this.settings.position
  }

  target(target) {
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

export default class Smoother {
  constructor() {}
  //   constructor(options = {}) {
  //     this.settings = {
  //       position: 0,
  //       drag: 0.75,
  //       strength: 0.1,
  //       ...options
  //     }
  
  //     this.velocity = 0
  //     this.position = this.target = this.settings.position
  //   }
  
  //   target(target) {
  //     this.target = target
  //   }
  
  //   update(target = this.target) {
  //     const { strength, drag } = this.settings
  
  //     let force = target - this.position
  //     force *= strength
  
  //     this.velocity *= drag
  //     this.velocity += force
  
  //     this.position += this.velocity
  
  //     return this.position
  //   }
  
  //   valueOf() {
  //     return this.position
  //   }
  //
}