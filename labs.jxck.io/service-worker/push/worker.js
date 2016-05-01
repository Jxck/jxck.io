self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
  console.info('installed', e);
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  console.info('activated', e);
});

self.addEventListener('push', (e) => {
  console.info('pushed message', e);
  let message = e.data.text();
  e.waitUntil(
    self.registration.showNotification('hoge', {
      body: message,
      icon: '/service-worker/push/jxck.png',
      tag: 'my-tag',
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  console.info('notification click: tag ', e.notification.tag);
  e.notification.close();
  const url = 'https://labs.jxck.io/service-worker/push/';
  e.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then((windowClients) => {
      Array.from(windowClients).forEach((client) => {
        console.info(client.url);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      });
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
