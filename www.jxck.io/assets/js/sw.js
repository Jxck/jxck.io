(async () => {
  'use strict'
  EventTarget.prototype.on  = EventTarget.prototype.addEventListener
  EventTarget.prototype.off = EventTarget.prototype.removeEventListener
  const DEBUG   = location.hash === '#debug'
  const VERSION = 'v0.2.5'
  const log = DEBUG ? console.log.bind(console) : () => {}
  log('sw.js')

  // Window
  if (typeof window !== 'undefined') {
    async function master() {
      log('mastert()')

      if (location.hash === "#clear") {
        const registrations = await navigator.serviceWorker.getRegistrations()
        registrations.forEach(async (registration) => {
          console.log(registration)
          await registration.unregister()
        })
        return
      }

      const controllerChange = new Promise((resolve, reject) => {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          resolve(navigator.serviceWorker.controller)
        })
      })

      const registration = await navigator.serviceWorker.register(`/assets/js/sw.js`, { scope: '/' })
      console.log(await navigator.serviceWorker.ready)
    }
    master()
  }

  // Service Worker
  if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
    async function worker() {
      log('worker()', self)

      const ASSETS = [
        'https://jxck.io/assets/font/NotoSansCJKjp-Regular-Jxck-20191013.woff2',
        'https://jxck.io/assets/font/NotoSansCJKjp-Bold-Jxck-20191013.woff2',
        'https://jxck.io/assets/font/NotoSansMonoCJKjp-Regular-Jxck-20191013.woff2',
        'https://jxck.io/assets/font/NotoSansMonoCJKjp-Bold-Jxck-20191013.woff2',
        'https://jxck.io/assets/js/highlight.pack.js',
        'https://use.fontawesome.com/releases/v5.9.0/webfonts/fa-solid-900.ttf',
      ]

      self.on('install', async (e) => {
        log('install > skipWaiting', e)
        async function installing() {
          const cache = await caches.open(VERSION)
          // キャッシュされた URL の一覧
          const urls = Array.from(await cache.keys()).map((req) => req.url)
          console.log('exists', urls)
          // キャッシュされてない ASSETS 一覧
          const diff = ASSETS.filter((asset) => !urls.includes(asset))
          console.log('diff', diff)
          await cache.addAll(diff)
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
            console.log('remove cache table', store)
            return caches.delete(store)
          })

          // 不要なエントリの抽出
          const cache           = await caches.open(VERSION)
          const requests        = await cache.keys()
          const old_requests    = requests.filter((req) => !ASSETS.includes(req.url))
          const requests_remove = old_requests.map((req) => {
            console.log('remove cache', req.url)
            return cache.delete(req)
          })

          // 一斉に削除
          await Promise.all(stores_remove.concat(requests_remove))

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
  }
})()
