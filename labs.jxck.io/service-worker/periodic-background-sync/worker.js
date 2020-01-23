console.info('worker')

self.addEventListener('install', (e) => {
  console.info('install', e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info('activate', e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('periodicsync', (e) => {
  console.log('periodicsync', e)
  e.waitUntil(async function() {
    const cache = await caches.open('periodic-background-sync')
    return cache.add(`./?q=${Date.now()}`, res)
  }())
})
