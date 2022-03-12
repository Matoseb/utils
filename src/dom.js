export function getIndex(domElement) {
  return [...domElement.parentElement.children].indexOf(domElement)
}
