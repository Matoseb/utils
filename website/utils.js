export function isModule(obj) {
  return obj[Symbol.toStringTag] === 'Module'
}
export function getLocal(key, def) {
  const elem = localStorage.getItem(key)
  if (elem === null) return def
  return JSON.parse(elem)
}

export function setLocal(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}
