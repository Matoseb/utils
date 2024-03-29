export function iterate(obj, callback, method = 'map') {
  const func = ([key, value]) => [key, callback(value, key, obj)]
  return Object.fromEntries(Object.entries(obj)[method](func) || {})
}

export function deepClone(obj) {
  // console.warn('deepClone() is deprecated, use structuredClone() instead')
  return JSON.parse(JSON.stringify(obj))
}

export function* Enum(a, b = []) {
  let i = 0
  while (true) {
    let v
    if (arguments.length === 0) v = Symbol()
    else if (
      typeof a === 'function' &&
      !(a.prototype && a.prototype.constructor === a)
    ) {
      v = a.call(this, i)
    } else {
      v = a
    }
    b.push(v)
    i++
    yield v
  }
}

export function monkeyPatcher(element, property, { getter, setter }) {
  const original = Object.getOwnPropertyDescriptor(element, property)
  Object.defineProperty(element, property, {
    get() {
      return getter(original.get.bind(this))
    },
    set(...values) {
      setter(original.set.bind(this), ...values)
    },
  })
}
