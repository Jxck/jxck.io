importScripts('/assets/js/workbox-v6.1.5/workbox-core.prod.js')
importScripts('/assets/js/workbox-v6.1.5/workbox-routing.prod.js')
importScripts('/assets/js/workbox-v6.1.5/workbox-strategies.prod.js')
importScripts('/assets/js/workbox-v6.1.5/workbox-precaching.prod.js')

/**
 * Ruby でビルドして version を更新するので
 * フォーマットを崩さない
 */
const precache =
/*precache-build.rb*/
[
  "https://www.jxck.io/assets/js/main.js?210502_142941",
  "https://www.jxck.io/assets/js/prism.js?210115_215132",
  "https://www.jxck.io/assets/js/ga.js?210325_165821",
  "https://www.jxck.io/assets/css/archive.css?200907_002254",
  "https://www.jxck.io/assets/css/article.css?210426_200525",
  "https://www.jxck.io/assets/css/body.css?210426_195211",
  "https://www.jxck.io/assets/css/footer.css?201223_011131",
  "https://www.jxck.io/assets/css/header.css?210501_230901",
  "https://www.jxck.io/assets/css/index.css?210325_220155",
  "https://www.jxck.io/assets/css/info.css?201223_011131",
  "https://www.jxck.io/assets/css/main.css?201223_011131",
  "https://www.jxck.io/assets/css/markdown.css?201218_145648",
  "https://www.jxck.io/assets/css/pre.css?210116_195125",
  "https://www.jxck.io/assets/css/search.css?201223_011131",
  "https://www.jxck.io/assets/css/table.css?201223_011131",
  "https://www.jxck.io/assets/img/blog.svg?160301_215351",
  "https://www.jxck.io/assets/img/search.svg?190421_130410",
  "https://www.jxck.io/assets/img/rss.svg?160227_124312",
  "https://www.jxck.io/assets/img/humans.svg?160831_002319",
  "https://www.jxck.io/assets/img/jxck.svg?190123_200004",
  "https://www.jxck.io/assets/img/amp.svg?181110_002524",
  "https://www.jxck.io/assets/img/up.svg?160831_002319",
  "https://www.jxck.io/assets/img/jxck.png?210331_115006",
]
/*precache-build.rb*/


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
