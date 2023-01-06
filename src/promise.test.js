import { describe, test, expect } from 'vitest'
import { Deferred, settle } from './promise'

describe('settle function', () => {
  test('with rejected promise', async () => {
    const reason = 'error'
    await expect(settle(Promise.reject(reason))).resolves.toEqual({
      reason,
      status: 'rejected',
    })
  })

  test('with fulfilled promise', async () => {
    const value = '23'
    await expect(settle(Promise.resolve(value))).resolves.toEqual({
      value,
      status: 'fulfilled',
    })
  })
})

describe('Deferred class', () => {
  test('with rejected promise', async () => {
    const deferred = new Deferred()
    const reason = 'error'
    deferred.reject(reason)
    await expect(deferred.promise).rejects.toEqual(reason)
  })

  test('with fulfilled promise', async () => {
    const deferred = new Deferred()
    const reason = 'error'
    deferred.resolve(reason)
    await expect(deferred.promise).resolves.toEqual(reason)
  })
})
