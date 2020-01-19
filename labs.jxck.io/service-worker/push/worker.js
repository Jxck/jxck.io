const CACHE_KEY = 'push-cache'

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('push', (e) => {
  console.info(e.type, e)
  const {title, options} = e.data.json()
  e.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', async (e) => {
  console.info(e.type, e)
  e.notification.close()

  e.waitUntil((async () => {
    const URL = 'https://labs.jxck.io/service-worker/push/'
    const windowClients = await clients.matchAll({ type: 'window' })
    const target = windowClients.filter((client) => client.url === URL)
    console.log(target, target.length)
    if (target.length > 0) {
      // タブが開いているので、最初のものにフォーカスする
      return target[0].focus()
    }
    // タブが開いてないので開く
    return clients.openWindow(URL)
  })())
})
