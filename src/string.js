export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isWhiteSpaceOnly(str) {
  return str.trim().length === 0;
}
