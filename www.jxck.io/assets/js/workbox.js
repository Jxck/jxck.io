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
  "/assets/js/main.js?210502_142941",
  "/assets/js/prism.js?210115_215132",
  "/assets/js/ga.js?210325_165821",
  "/assets/css/archive.css?200907_002254",
  "/assets/css/article.css?210426_200525",
  "/assets/css/body.css?210426_195211",
  "/assets/css/footer.css?201223_011131",
  "/assets/css/header.css?210501_230901",
  "/assets/css/index.css?210325_220155",
  "/assets/css/info.css?201223_011131",
  "/assets/css/main.css?201223_011131",
  "/assets/css/markdown.css?201218_145648",
  "/assets/css/pre.css?210116_195125",
  "/assets/css/search.css?201223_011131",
  "/assets/css/table.css?201223_011131",
  "/assets/img/blog.svg?160301_215351",
  "/assets/img/search.svg?190421_130410",
  "/assets/img/rss.svg?160227_124312",
  "/assets/img/humans.svg?160831_002319",
  "/assets/img/jxck.svg?190123_200004",
  "/assets/img/amp.svg?181110_002524",
  "/assets/img/up.svg?160831_002319",
  "/assets/img/jxck.png?210331_115006",
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
