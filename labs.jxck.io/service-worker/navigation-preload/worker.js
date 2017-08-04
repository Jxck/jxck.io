console.info('worker')

const start = Date.now()
while(Date.now() - start < 600);

self.addEventListener('activate', (e) => {
  if (!self.registration.navigationPreload) {
    console.log("navigationPreload not supported")
  }
  console.log("navigationPreload supported")
  e.waitUntil(self.registration.navigationPreload.enable())
})

self.addEventListener('fetch', (e) => {
  console.log(e.request.url)
  e.preloadResponse
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })

  e.respondWith(fetch(e.request));
})
