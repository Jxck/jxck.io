console.log('master')

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info(e.type, e)
  })
  return navigator.serviceWorker.ready
})
