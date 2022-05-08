console.info('worker')

// set cache-control: max-age=10

const KEY  = 'cache-expire'
const URLS = ['.', 'master.js', 'worker.js']

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)

  e.waitUntil((async () => {
    // remove old cache
    await caches.delete(KEY)
    console.log('clear cache')

    // add new cache
    const cache = await caches.open(KEY)
    await cache.addAll(URLS)
    console.log(`add ${URLS} to cache`)

    return self.clients.claim()
  })())
})

self.addEventListener('fetch', (e) => {
  console.info('fetch', e)

  const req = e.request
  e.respondWith((async () => {
    const cache  = await caches.open(KEY)
    const cached = await cache.match(req)
    if (cached) {
      console.log('cache hit !!', cached)
      return cached
    }
    const res  = await fetch(req)
    console.log('fetched !!', res)
    e.waitUntil(cache.put(req, res.clone()))
    return res
  })())
})
