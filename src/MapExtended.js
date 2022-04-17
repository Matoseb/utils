const NO_VALUE = undefined

/**
 * Class adding functionalities to MapExtended.
 * @extends Map
 **/

export default class MapExtended extends Map {
  /**
   * Create a Map Extender.
   * @param {number} x - The x value.
   */
  constructor() {
    super(...arguments)
  }

  /**
   * Rename a specific key.
   * @param {*} oldKey - The old key.
   * @param {*} newKey - The new key.
   */
  renameKey(oldKey, newKey) {
    this.set(newKey, this.get(oldKey)).delete(oldKey)
  }

  /**
   * Removes the first element and returns that removed element.
   * @return {*} The removed element.
   */
  shift() {
    const { value, done } = this.entries().next()
    if (done) return NO_VALUE
    this.delete(value[0])
    return value
  }

  /**
   * Removes the last element and returns that removed element.
   * @return {*} The removed element.
   */
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
