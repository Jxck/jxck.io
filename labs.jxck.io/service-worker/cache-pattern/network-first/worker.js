console.info('worker')

const CACHE_KEY = 'network-first'

// self.addEventListener('install', (e) => {
//   console.info(e.type, e)
//   e.waitUntil(skipWaiting())
// })
self.addEventListener('install', function (e) {
  console.info(e.type, e)
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_KEY)
    return cache.addAll([
      'main.js',
      // etc.
    ])
  })())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    // grab cache
    const cache = await caches.open(CACHE_KEY)
    const stored = await cache.match(e.request)
    if (stored) return stored
    // fallback to network
    const response = await fetch(e.request)
    await cache.put(e.request, response.clone())
    return response
  })())
})
