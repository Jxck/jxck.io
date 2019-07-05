(async () => {
  'use strict'
  EventTarget.prototype.on  = EventTarget.prototype.addEventListener
  EventTarget.prototype.off = EventTarget.prototype.removeEventListener
  const DEBUG   = location.hash === '#debug'
  const VERSION = 'v0.2'
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
        'https://mozaic.fm/assets/font/NotoSansCJKjp-Jxck-Regular-201906.woff2',
        'https://mozaic.fm/assets/font/NotoSansCJKjp-Jxck-Bold-201906.woff2',
        'https://mozaic.fm/assets/font/NotoSansMonoCJKjp-Jxck-Regular-201906.woff2',
        'https://mozaic.fm/assets/font/NotoSansMonoCJKjp-Jxck-Bold-201906.woff2',
        'https://mozaic.fm/assets/js/highlight.min.js',
        'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-solid-900.ttf',
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
          const keys = await caches.keys()
          log('version', VERSION)
          const old_keys = keys.filter((key) => key !== VERSION)
          await Promise.all(old_keys.map((key) => {
            log('remove cache', key)
            return caches.delete(key)
          }))
          return self.clients.claim()
        }
        e.waitUntil(clean_cache())
      })

      self.on('fetch', async (e) => {
        const req = e.request
        log(req)
        if (ASSETS.includes(req.url)) {
          async function fetching(req) {
            // safari は fetch(req) が Range だと
            // mp3 の duration が取れず Infinity になり壊れる
            // そこでここをホワイトリストにした
            const res = await caches.match(req)
            log('cache match', res)
            return res || fetch(req)
          }
          e.respondWith(fetching(req))
        }
        return
      })
    }
    worker()
  }
})()
