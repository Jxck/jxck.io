importScripts('assets/workbox-v6.1.5/workbox-core.prod.js')
importScripts('assets/workbox-v6.1.5/workbox-routing.prod.js')
importScripts('assets/workbox-v6.1.5/workbox-strategies.prod.js')
importScripts('assets/workbox-v6.1.5/workbox-precaching.prod.js')

// precache
const {PrecacheController} = workbox.precaching
const precacheController   = new PrecacheController()

precacheController.addToCacheList([
  {url: "/service-worker/workbox/assets/a.css?v1",    revision: null},
  {url: "/service-worker/workbox/assets/b.css?v1",    revision: null},
  {url: "/service-worker/workbox/assets/c.css?v1",    revision: null},
  {url: "/service-worker/workbox/assets/x.js?v1",     revision: null},
  {url: "/service-worker/workbox/assets/y.js?v1",     revision: null},
  {url: "/service-worker/workbox/assets/z.js?v1",     revision: null},
  {url: "/service-worker/workbox/assets/jxck.png?v1", revision: null},
  {url: "/service-worker/workbox/assets/jxck.svg?v1", revision: null},
])


// routing
const {registerRoute} = workbox.routing
const {NetworkFirst}  = workbox.strategies

registerRoute(
  ({request}) => {
    return (request.mode === 'navigate' && request.destination === 'document' )
  },
  new NetworkFirst()
);


self.addEventListener('install', (event) => {
  console.log(event.type)
  event.waitUntil((async () => {
    await precacheController.install(event)
    return skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  console.log(event.type)
  event.waitUntil((async () => {
    await precacheController.activate(event)
    return self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const cacheKey = precacheController.getCacheKeyForURL(event.request.url)
  if (cacheKey) {
    return event.respondWith(caches.match(cacheKey))
  }
  console.log(event.request.url, 'not cached')
  return
})
