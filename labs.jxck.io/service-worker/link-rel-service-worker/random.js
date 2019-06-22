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

  let url = new URL(e.request.url)
  if (!url.pathname.endsWith('/random')) {
    return
  }
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        console.log('online response')
        return response
      })
      .catch(() => {
        console.log('offline response')
        return new Response(Math.floor(Math.random()*100))
      })
  )
})
