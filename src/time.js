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
  tick() {
    const timeNow = this.getTime()
    const deltaTime = timeNow - this.time
    this.time = timeNow
    return deltaTime
  }
}
