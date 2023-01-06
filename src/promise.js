export class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

/**
 * Settle a promise.
 *
 * @param {Promise} promise - The promise to settle.
 * @returns {Object} An object with two properties:
 *   - `status`: either "fulfilled" or "rejected"
 *   - `value`: if `status` is "fulfilled", this is the resolved value of the promise
 *   - `reason`: if `status` is "rejected", this is the rejection reason for the promise
 * @async
 */
export async function settle(promise) {
  try {
    const value = await promise
    return { status: 'fulfilled', value }
  } catch (reason) {
    return { status: 'rejected', reason }
  }
}
