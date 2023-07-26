export async function delay(millis) {
  return await new Promise((resolve) => globalThis.setTimeout(resolve, millis))
}

export class Clock {
  constructor() {
    this.time = this.getTime()
  }
  getTime() {
    return globalThis.window ? performance.now() : Date.now()
  }
  delta() {
    const timeNow = this.getTime()
    const deltaTime = timeNow - this.time
    this.time = timeNow
    return deltaTime
  }
}

export function throttle(callback, delay) {
  let timeout
  let wait = 0
  return (e) => {
    if (timeout) return
    timeout = globalThis.setTimeout(() => {
      callback(e)
      timeout = undefined
    }, wait)
    wait = delay
  }
}
