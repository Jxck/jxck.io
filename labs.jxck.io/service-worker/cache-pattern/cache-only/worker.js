console.info('worker')

const CACHE_KEY = 'cache-only'

self.addEventListener('install', function (e) {
  console.info(e.type, e)
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_KEY)
    return cache.addAll([
      '.',
      'main.js',
      'worker.js',
      '/favicon.ico',
    ])
  })())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request))
})