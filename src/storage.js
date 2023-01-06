/**
 * Get a value from local storage.
 *
 * @param {string} key - The key of the value to retrieve.
 * @param {any} [def] - The default value to return if the key does not exist in local storage.
 * @returns {any} The value stored in local storage, or the default value if the key does not exist.
 */
export function getLocal(key, def) {
  const elem = localStorage.getItem(key)
  if (elem === null) return def
  try {
    return JSON.parse(elem)
  } catch (e) {
    return elem
  }
}

/**
 * Set a value in local storage. If the value is `undefined`, remove the key from local storage.
 *
 * @param {string} key - The key to use when storing the value.
 * @param {any} [value] - The value to store. If the value is not a string, it will be stringified using JSON.stringify.
 * @returns {void}
 */
export function setLocal(key, value) {
  if (value === undefined) return localStorage.removeItem(key)
  if (typeof value !== 'string') value = JSON.stringify(value)
  return localStorage.setItem(key, value)
}
