console.info('worker')

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(
    (async () => {
      const cache = await caches.open('v1')
      await cache.addAll([
        'tmp.js' // 3sec
      ])
      console.log('tmp.js cached')
      return skipWaiting()
    })()
  )
})

self.addEventListener('activate', (e) => {
  console.log(e.type, e)
  console.log("navigationPreload", self.registration.navigationPreload)
  e.waitUntil(Promise.all([
    self.registration.navigationPreload.enable(),
    self.clients.claim()
  ]))
})

self.addEventListener('fetch', (e) => {
  console.log(e.type, e.request.url)
  const req = e.request
  e.respondWith((async () => {
    const preload = await e.preloadResponse
    if (preload) {
      console.info('preload res', preload)
      const cache = await caches.open('v1')
      cache.add(req, preload)
      return preload
    }

    const stored = await caches.match(req)
    if (stored) {
      console.info('cache hit', stored)
      return stored
    }

    console.log('fetch', req)
    const res = await fetch(req)
    if (res) {
      const cache = await caches.open('v1')
      cache.add(req, res)
      return res
    }
  })())
})
