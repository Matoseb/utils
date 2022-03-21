export function getIndex(domElement) {
  return [...domElement.parentElement.children].indexOf(domElement)
}

export function queryAll(selector, parent = document) {
  return parent.querySelectorAll(selector)
}

export function query(selector, parent = document) {
  return parent.querySelector(selector)
}
