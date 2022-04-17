export async function loadJSON(url) {
  return await globalThis.fetch(url).then((response) => {
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
  })
}
