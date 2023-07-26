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

export function throttle(callback, millis) {
  let event
  let timestamp = -millis
  let wait = null

  return (e) => {
    event = e
    if (wait !== null) return

    wait = Math.min(Math.max(timestamp + millis - Date.now(), 0), millis)

    globalThis.setTimeout(() => {
      callback(event)
      wait = null
      timestamp = Date.now()
    }, wait)
  }
}
