import { describe, test, expect } from 'vitest'
import { getLocal, setLocal } from './storage'

describe('getLocal function', () => {
  test('get non existent storage without default', () => {
    expect(getLocal('non-existent')).toBe(undefined)
  })

  test('get non existent storage with default', () => {
    const value = false
    expect(getLocal('non-existent', value)).toBe(value)
  })

  test.each([
    0,
    1,
    'string',
    true,
    false,
    undefined,
    null,
    { key: 'value' },
    [1, 2],
  ])('get and set existant storage (%s)', (value) => {
    const key = 'existent'
    setLocal(key, value)
    expect(getLocal(key)).toEqual(value)
  })
})

describe('setLocal function', () => {
  test.each([
    [0, '0'],
    [1, '1'],
    ['string', 'string'],
    [true, 'true'],
    [false, 'false'],
    [undefined, null],
    [null, 'null'],
  ])('get and set existant storage (%s)', (a, b) => {
    const key = Math.random()
    localStorage.setItem(key, 'test')
    setLocal(key, a)
    expect(localStorage.getItem(key)).toBe(b)
  })
})
