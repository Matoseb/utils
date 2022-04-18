export function merge(...paths) {
  return paths
    .map((path) => sanitize(path))
    .filter(Boolean)
    .join('/')
}

export function sanitize(path) {
  return path.replace(/^\/+|\/+$/g, '')
}
