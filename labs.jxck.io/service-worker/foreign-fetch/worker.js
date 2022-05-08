const CACHE = "foreign-fetch"
self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    return cache.addAll([
      '.',
      './index.html',
      './worker.js'
    ])
  })())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.info(e.type, e.request)
  e.respondWith((async () => {
    const cache = await caches.open(CACHE)
    const cached = await cache.match(e.request)
    console.log({cached})
    return cached || fetch(e.request)
  })())
})
