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
  let timeout
  let timestamp = -millis
  let event
  return (e) => {
    event = e
    if (timeout) return

    const wait = Math.min(Math.max(timestamp + millis - Date.now(), 0), millis)

    timeout = globalThis.setTimeout(() => {
      callback(event)
      timeout = undefined
      timestamp = Date.now()
    }, wait)
  }
}
