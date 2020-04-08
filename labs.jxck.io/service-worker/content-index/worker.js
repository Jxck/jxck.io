console.info('worker')

self.addEventListener('install', async (e) => {
  console.info(e.type, e)
  console.log(self.registration.index)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})
