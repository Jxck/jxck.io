importScripts('https://www.jxck.io/assets/js/workbox-v6.5.4/workbox-core.prod.js')
importScripts('https://www.jxck.io/assets/js/workbox-v6.5.4/workbox-routing.prod.js')
importScripts('https://www.jxck.io/assets/js/workbox-v6.5.4/workbox-strategies.prod.js')
importScripts('https://www.jxck.io/assets/js/workbox-v6.5.4/workbox-precaching.prod.js')

/**
 * Ruby でビルドして version を更新するので
 * フォーマットを崩さない
 */
const precache =
/*---build.js---*/
[
  "https://www.jxck.io/assets/js/main.js?231116_154953",
  "https://www.jxck.io/assets/js/prism.js?231116_154953",
  "https://www.jxck.io/assets/js/ga.js?231116_154953",
  "https://www.jxck.io/assets/css/archive.css?231116_154953",
  "https://www.jxck.io/assets/css/article.css?231116_154953",
  "https://www.jxck.io/assets/css/body.css?231116_154953",
  "https://www.jxck.io/assets/css/footer.css?231116_154953",
  "https://www.jxck.io/assets/css/header.css?231116_154953",
  "https://www.jxck.io/assets/css/index.css?231116_154953",
  "https://www.jxck.io/assets/css/info.css?231116_154953",
  "https://www.jxck.io/assets/css/main.css?231116_154953",
  "https://www.jxck.io/assets/css/markdown.css?231116_154953",
  "https://www.jxck.io/assets/css/pre.css?231116_154953",
  "https://www.jxck.io/assets/css/search.css?231116_154953",
  "https://www.jxck.io/assets/css/table.css?231116_154953",
  "https://www.jxck.io/assets/img/blog.svg?231116_154953",
  "https://www.jxck.io/assets/img/search.svg?231116_154953",
  "https://www.jxck.io/assets/img/rss.svg?231116_154953",
  "https://www.jxck.io/assets/img/humans.svg?231116_154953",
  "https://www.jxck.io/assets/img/jxck.svg?231116_154953",
  "https://www.jxck.io/assets/img/amp.svg?231116_154953",
  "https://www.jxck.io/assets/img/up.svg?231116_154953",
  "https://www.jxck.io/assets/img/jxck.png?231116_154953",
]
/*---build.js---*/


// precache
const {PrecacheController} = workbox.precaching
const precacheController   = new PrecacheController()
const revision = null

precacheController.addToCacheList(precache.map((url) => {
  return {url, revision}
}))


// routing
const {registerRoute} = workbox.routing
const {NetworkFirst}  = workbox.strategies

registerRoute(
  ({request}) => {
    return (request.mode === 'navigate' && request.destination === 'document' )
  },
  new NetworkFirst()
);


// Events
self.addEventListener('install', (event) => {
  console.debug(`%c${event.type}`, 'color: blue; font-weight: bold')
  event.waitUntil((async () => {
    await precacheController.install(event)
    return skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  console.debug(`%c${event.type}`, 'color: blue; font-weight: bold')
  event.waitUntil((async () => {
    await precacheController.activate(event)
    return self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const cacheKey = precacheController.getCacheKeyForURL(event.request.url)
  if (cacheKey) {
    console.debug('%cCACHE-HIT:', 'color: green; font-weight: bold', event.request.url);
    return event.respondWith(caches.match(cacheKey))
  }
  console.debug('%cCACHE-MISS:', 'color: red; font-weight: bold', event.request.url);
  return
})
