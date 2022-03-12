export function getSiblingIndex(domElement) {
  return [...domElement.parentElement.children].indexOf(domElement)
}
