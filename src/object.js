export function iterate(obj, callback, method = 'map') {
  const func = ([key, value]) => [key, callback(value, key, obj)]
  return Object.fromEntries(Object.entries(obj)[method](func) || {})
}

export function deepClone(obj) {
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
