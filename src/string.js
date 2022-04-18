export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isWhiteSpaceOnly(str) {
  return str.trim().length === 0
}

export function encapsulate(
  string,
  substring,
  prefix,
  suffix,
  { caseSensitive } = {}
) {
  const modifier = caseSensitive ? 'g' : 'gi'
  const regExp = new RegExp(`(${substring})`, modifier)
  return string.replace(regExp, `${prefix}$1${suffix}`)
}
