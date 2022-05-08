console.info('worker')

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  const path = new URL(e.request.url).pathname
  console.log(path)
  if (path.endsWith('/test')) {
    e.respondWith(new Response('test'))
  }
  // fallback to network
  return
})
