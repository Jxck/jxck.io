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
  const message = e.data.text()

  e.waitUntil(self.registration.showNotification('title', {
    body: message,
    icon: '/service-worker/push/jxck.png',
    tag:  'push-demo',
  }))
})

self.addEventListener('notificationclick', (e) => {
  console.info('notificationclick', e.notification.tag)
  e.notification.close()
  const URL = 'https://labs.jxck.io/service-worker/push/'
  e.waitUntil(clients.matchAll({
      type: 'window'
    }).then((windowClients) => {
      const target = windowClients.filter((client) => {
        return client.url === URL
      })
      console.log(target, target.length)
      if (target.length > 0) {
        // タブが開いているので、最初のものにフォーカスする
        return target[0].focus()
      }
      // タブが開いてないので開く
      return clients.openWindow(URL)
  }))
})
