self.addEventListener('install', (e) => {
  console.info('install', e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info('activate', e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.info('fetch', e)

  const url = new URL(e.request.url)
  if (!url.pathname.endsWith('/random')) {
    return
  }
  e.respondWith(async () => {
    try {
      const res = await fetch(e.request)
      console.log('online response')
      return res
    } catch(err) => {
      console.log('offline response', err)
      return new Response(Math.floor(Math.random()*100))
    }
  }())
})
