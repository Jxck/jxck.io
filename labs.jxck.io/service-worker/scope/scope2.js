console.info('worker2')

const ver = 1

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  const path = new URL(e.request.url).pathname
  console.info(path)
  if (path.endsWith('test')) {
    e.respondWith(new Response('test2'))
  }
  return
})
