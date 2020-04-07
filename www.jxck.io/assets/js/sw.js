'use strict'
EventTarget.prototype.on  = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener
/**
 * 同じ VERSION であれば、キャッシュにないものだけ追加する
 * VERSION を変えると、あたらしく作り追加する
 */
const VERSION = 'v0.4.0'
const log = console.debug.bind(console)
log('sw.js')

// Service Worker
async function worker() {
  log('worker()', self)

  const ASSETS = [
    // episodes
    new Request('https://mozaic.fm/episodes/0/introduction-of-mozaicfm.html', {cache: 'no-store'}),

    // fonts
    'https://mozaic.fm/assets/font/NotoSansCJKjp-Regular-Jxck-20200407.woff2',
    'https://mozaic.fm/assets/font/NotoSansCJKjp-Bold-Jxck-20200407.woff2',
    'https://mozaic.fm/assets/font/NotoSansMonoCJKjp-Regular-Jxck-20200407.woff2',
    'https://mozaic.fm/assets/font/NotoSansMonoCJKjp-Bold-Jxck-20200407.woff2',
    'https://mozaic.fm/assets/js/highlight.pack.js',

    // css
    'https://mozaic.fm/assets/css/body.css',
    'https://mozaic.fm/assets/css/article.css',
    'https://mozaic.fm/assets/css/dialog.css',
    'https://mozaic.fm/assets/css/info.css',
    'https://mozaic.fm/assets/css/header.css',
    'https://mozaic.fm/assets/css/footer.css',
    'https://mozaic.fm/assets/css/main.css',
    'https://mozaic.fm/assets/css/mozaic.css',

    // svg
    'https://mozaic.fm/assets/img/jxck.svg',
    'https://mozaic.fm/assets/img/mozaic.svg',
    'https://mozaic.fm/assets/img/podcast.svg',
    'https://mozaic.fm/assets/img/itunes.svg',
    'https://mozaic.fm/assets/img/google-podcast.svg',
    'https://mozaic.fm/assets/img/search.svg',
    'https://mozaic.fm/assets/img/share.svg',
    'https://mozaic.fm/assets/img/twitter.svg',

    // png
    'https://mozaic.fm/assets/img/mozaic.png',
    'https://mozaic.fm/assets/img/portal-preview.png',

    // js
    'https://mozaic.fm/assets/js/mozaic-player.mjs',
    'https://mozaic.fm/assets/js/mozaic.js',
    'https://mozaic.fm/assets/js/sw.js',

    // template
    'https://mozaic.fm/assets/template/mozaic-player.html',

    // other
    'https://mozaic.fm/manifest.webmanifest',
  ]

  self.on('install', async (e) => {
    log('install > skipWaiting', e)
    async function installing() {
      const cache = await caches.open(VERSION)
      await cache.addAll(ASSETS)
      return skipWaiting()
    }
    e.waitUntil(installing())
  })

  self.on('activate', async (e) => {
    log('activate > claim', e)
    async function clean_cache() {
      log('version', VERSION)

      // 不要なストアの抽出
      const stores        = await caches.keys()
      const old_stores    = stores.filter((store) => store !== VERSION)
      const stores_remove = old_stores.map((store) => {
        log('remove cache table', store)
        return caches.delete(store)
      })

      // 不要なエントリの抽出
      // const cache           = await caches.open(VERSION)
      // const requests        = await cache.keys()
      // const old_requests    = requests.filter((req) => !ASSETS.includes(req.url))
      // const requests_remove = old_requests.map((req) => {
      //   log('remove cache', req.url)
      //   return cache.delete(req)
      // })

      // 一斉に削除
      const result = await Promise.allSettled(stores_remove)
      log(result)

      return self.clients.claim()
    }
    e.waitUntil(clean_cache())
  })

  self.on('fetch', async (e) => {
    const req = e.request
    log(req)

    // Cache のリストになかった場合はブラウザにフォールバック
    if (!ASSETS.includes(req.url)) return

    // cache then fetch
    async function fetching(req) {
      // safari は fetch(req) が Range だと
      // mp3 の duration が取れず Infinity になり壊れる
      // そこでここをホワイトリストにした
      const res = await caches.match(req)
      log('cache match', res)
      return res || fetch(req)
    }
    e.respondWith(fetching(req))
  })
}
worker()
