console.info("worker")

const CACHE_KEY = "cache-first"

self.addEventListener("install", function (e) {
  console.info(e.type, e)
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_KEY)
      return cache.addAll([
        ".",
        "main.js",
        "worker.js",
        "/favicon.ico"
      ])
    })()
  )
})

self.addEventListener("activate", (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      // grab cache
      const cache = await caches.open(CACHE_KEY)
      const stored = await cache.match(e.request)
      if (stored) return stored
      // fallback to network
      const response = await fetch(e.request)
      await cache.put(e.request, response.clone())
      return response
    })()
  )
})
