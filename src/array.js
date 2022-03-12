export function remove(arr, elem) {
  const index = arr.indexOf(elem)
  if (index === -1) return false
  arr.splice(index, 1)
  return true
}

export function fill(amount, entry) {
  return new Array(amount).fill(entry)
}

export function range(start = 0, stop, step = 1) {
  if (stop === undefined) [start, stop] = [0, start]

  start -= step
  return {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: (start += step),
        done: start >= stop,
      }),
    }),
  }
}