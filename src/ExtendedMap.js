const noValue = undefined

export default class ExtendedMap extends Map {
  constructor() {
    super(...arguments)
  }

  renameKey(oldKey, newKey) {
    this.set(newKey, this.get(oldKey)).delete(oldKey)
  }

  shift() {
    const { value, done } = this.entries().next()
    if (done) return noValue
    this.delete(value[0])
    return value
  }

  pop() {
    const value = [...this.entries()].pop()
    if (!value) return noValue
    this.delete(value[0])
    return value
  }
}
