export async function delay(millis) {
  return await new Promise((resolve) => globalThis.setTimeout(resolve, millis))
}