export function iterate(obj, callback, method = 'map') {
  const func = ([key, value]) => [key, callback(value, key, obj)]
  return Object.fromEntries(Object.entries(obj)[method](func) || {})
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}