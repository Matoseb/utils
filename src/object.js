function noop() { }

export function map(obj, callback = noop) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
      return [key, callback(value, key, obj)]
  }))
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}