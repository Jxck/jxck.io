(async () => {
  'use strict'
  EventTarget.prototype.on  = EventTarget.prototype.addEventListener
  EventTarget.prototype.off = EventTarget.prototype.removeEventListener
  const DEBUG   = true
  const VERSION = 'v0'
  const log = DEBUG ? console.log.bind(console) : () => {}
  log('sw.js')

  // Window
  if (typeof window !== 'undefined' && location.hash === "#sw") {
    async function master() {
      log('mastert()')
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

      self.on('install', async (e) => {
        log('install > skipWaiting', e)
        async function installing() {
          const cache = await caches.open(VERSION)
          await cache.addAll([
            '/assets/font/NotoSansCJKjp-Jxck-Regular-201906.woff2',
            '/assets/font/NotoSansCJKjp-Jxck-Bold-201906.woff2',
            '/assets/font/NotoSansMonoCJKjp-Jxck-Regular-201906.woff2',
            '/assets/font/NotoSansMonoCJKjp-Jxck-Bold-201906.woff2',
            '/assets/js/highlight.min.js',
          ])
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
        // log(e.request)
        async function fetching(req) {
          const res = await caches.match(req)
          // log('cache hit', res)
          return res || fetch(req)
        }
        e.respondWith(fetching(e.request))
      })
    }
    worker()
  }
})()
