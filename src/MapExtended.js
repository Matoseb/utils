const NO_VALUE = undefined

export default class MapExtended extends Map {
  constructor() {
    super(...arguments)
  }

  renameKey(oldKey, newKey) {
    this.set(newKey, this.get(oldKey)).delete(oldKey)
  }

  shift() {
    const { value, done } = this.entries().next()
    if (done) return NO_VALUE
    this.delete(value[0])
    return value
  }

  pop() {
    const value = [...this.entries()].pop()
    if (!value) return NO_VALUE
    this.delete(value[0])
    return value
  }
  
  getOrCreate(key, value) {
    let result = this.get(key)
    if (result === undefined) {
      this.set(key, value)
      result = value
    }
    return result
  }
}
