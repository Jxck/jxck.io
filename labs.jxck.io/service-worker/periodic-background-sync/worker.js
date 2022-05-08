console.info('worker')

const KEY  = 'periodic-background-sync'

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.info(e.type, e)
  return
})

self.addEventListener('periodicsync', (e) => {
  console.info(e.type, e)
  e.waitUntil((async () => {
    const cache = await caches.open('periodic-background-sync')
    return cache.add(new Request(`/?date=${new Date().toISOString()}`), new Response())
  })())
})
