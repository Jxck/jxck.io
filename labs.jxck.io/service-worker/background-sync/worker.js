self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('sync', (e) => {
  console.log(e.type, e)
  e.waitUntil((async () => {
    const rand  = btoa(Math.random())
    const res   = await fetch(`./?sync=${rand}`)
    const date  = res.headers.get('date')
    const url   = new URL(res.url)
    url.search  = date
    const cache = await caches.open('background-sync')
    return cache.put(url, res)
  })())
})
