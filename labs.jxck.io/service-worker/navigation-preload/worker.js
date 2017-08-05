console.info('worker')

self.addEventListener('activate', (e) => {
  if (!self.registration.navigationPreload) {
    console.log("navigationPreload not supported")
  }
  console.log("navigationPreload supported")
  e.waitUntil(self.registration.navigationPreload.enable())
})

self.addEventListener('fetch', (e) => {
  console.log('url', e.request.url)

  e.respondWith((() => {
    return e.preloadResponse.then((res) => {
      console.info('preload res', res)
      if (res) return res

      console.log('fetch')
      return fetch(e.request)
    });
  })())
})
