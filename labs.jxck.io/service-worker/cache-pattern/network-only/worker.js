console.info('worker')

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.log(e)
  // e.respondWith(fetch(e.request));
  return
})
