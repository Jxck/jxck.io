importScripts('assets/workbox-v6.1.2/workbox-sw.js')
importScripts('assets/workbox-v6.1.2/workbox-core.prod.js')
importScripts('assets/workbox-v6.1.2/workbox-routing.prod.js')
importScripts('assets/workbox-v6.1.2/workbox-strategies.prod.js')
importScripts('assets/workbox-v6.1.2/workbox-precaching.prod.js')

console.log(workbox)

const {PrecacheController}       = workbox.precaching
const {registerRoute, Router}    = workbox.routing
const {CacheFirst, NetworkFirst} = workbox.strategies


console.log(Router)

const router = new Router()


const precacheController = new PrecacheController()
precacheController.addToCacheList([
  {url: "/service-worker/workbox/assets/a.css?v1", revision: null},
  {url: "/service-worker/workbox/assets/b.css?v1", revision: null},
  {url: "/service-worker/workbox/assets/c.css?v1", revision: null},
  {url: "/service-worker/workbox/assets/x.js?v2",  revision: null},
  {url: "/service-worker/workbox/assets/y.js?v2",  revision: null},
  {url: "/service-worker/workbox/assets/z.js?v1",  revision: null},
  {url: "/favicon.ico?v1",                         revision: null},
]);

//registerRoute(
//  ({request}) => {
//    return request.mode === 'navigate'
//  },
//  new NetworkFirst()
//);
//
//registerRoute(
//  ({url}) => {
//    return url.pathname.startsWith("/service-worker/workbox/assets/")
//  },
//  new CacheFirst()
//);


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
  const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
  if (cacheKey === undefined) return console.log(event.request.url, 'not cached')
  event.respondWith(caches.match(cacheKey));
});




//self.addEventListener('fetch', (event) => {
//  console.log(event.request.url)
//  const responsePromise = router.handleRequest(event)
//  console.log(responsePromise)
//  if (responsePromise) {
//    // Router found a route to handle the request
//    event.respondWith(responsePromise)
//  }
//  return
//})
