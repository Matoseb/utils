export async function loadJSON(url) {
  return await globalThis.fetch(url)
  .then((data) => data.json())
  .then((json) => json);
}