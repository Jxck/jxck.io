console.info("worker")

const CACHE_KEY = "stale-while-revalidate"

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
      const cache = await caches.open(CACHE_KEY)
      const stored = await cache.match(e.request)
      console.log({ stored })
      const fetchPromise = fetch(e.request)

      e.waitUntil(
        (async () => {
          const response = await fetchPromise
          console.log({ response })
          await cache.put(e.request, response.clone())
        })()
      )

      return stored || fetchPromise
    })()
  )
})