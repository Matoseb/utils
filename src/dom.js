export function getIndex(domElement) {
  return [...domElement.parentElement.children].indexOf(domElement)
}

export function queryAll(selector, parent = document) {
  return parent.querySelectorAll(selector)
}

export function query(selector, parent = document) {
  return parent.querySelector(selector)
}

export function setVariableFontSettings(domElement, fontAxes) {
  const value = Object.entries(fontAxes)
    .map(([key, value]) => `"${key}" ${value}`)
    .join(', ')

  domElement.style.setProperty('font-variation-settings', value)
}
