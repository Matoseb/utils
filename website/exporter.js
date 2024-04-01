export const initExporter = (selfWin = window) => {
  console.log('Dashboard exporter')
  const storage = JSON.parse(localStorage.getItem('dashboards'))
  if (!storage) return

  console.log(storage)

  const willExport = confirm('Export dashboards to dash.matoseb.com?')
  let targetWindow

  selfWin.addEventListener('message', (event) => {
    const { type } = event.data
    console.log('Message received', event)
    if (type === 'ready') {
      if (storage) {
        const dashboards = storage.items.map(({ name, id }) => {
          const data = localStorage.getItem(id)
          return {
            i: id,
            t: name,
            d: data,
          }
        })

        // get window sendr
        targetWindow.postMessage({ type: 'import', dashboards }, '*')
      }
    } else if (type === 'imported') {
      // empty storage
      // localStorage.removeItem("dashboards");
      selfWin.close()
    }
  })

  if (!willExport) return
  targetWindow = selfWin.open()
  setTimeout(() => {
    targetWindow.location.replace('https://dash.matoseb.com')
  }, 1000)
  // targetWindow = selfWin.open(
  //   'https://dash.matoseb.com',
  //   'dashboard.matoseb.com'
  // )
}
