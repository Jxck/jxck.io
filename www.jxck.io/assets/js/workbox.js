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
  "https://www.jxck.io/assets/js/main.js?230728_230731",
  "https://www.jxck.io/assets/js/prism.js?210115_215132",
  "https://www.jxck.io/assets/js/ga.js?210325_165821",
  "https://www.jxck.io/assets/css/archive.css?220304_061221",
  "https://www.jxck.io/assets/css/article.css?220222_230717",
  "https://www.jxck.io/assets/css/body.css?240701_143853",
  "https://www.jxck.io/assets/css/footer.css?201223_011131",
  "https://www.jxck.io/assets/css/header.css?230926_134917",
  "https://www.jxck.io/assets/css/index.css?240701_143853",
  "https://www.jxck.io/assets/css/info.css?240713_033106",
  "https://www.jxck.io/assets/css/main.css?201223_011131",
  "https://www.jxck.io/assets/css/markdown.css?220304_061221",
  "https://www.jxck.io/assets/css/pre.css?220404_030403",
  "https://www.jxck.io/assets/css/search.css?220304_061221",
  "https://www.jxck.io/assets/css/table.css?220306_111358",
  "https://www.jxck.io/assets/img/blog.svg?160301_215351",
  "https://www.jxck.io/assets/img/search.svg?190421_130410",
  "https://www.jxck.io/assets/img/rss.svg?160227_124312",
  "https://www.jxck.io/assets/img/humans.svg?160831_002319",
  "https://www.jxck.io/assets/img/jxck.svg?190123_200004",
  "https://www.jxck.io/assets/img/amp.svg?181110_002524",
  "https://www.jxck.io/assets/img/up.svg?160831_002319",
  "https://www.jxck.io/assets/img/jxck.png?210331_115006",
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
