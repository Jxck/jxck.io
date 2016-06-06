self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activat', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (e) => {
  console.info('push', e);
  let data = JSON.parse(e.data.text());
  e.waitUntil(
    self.registration.showNotification(data.title, data)
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
      // if window already exists
      for (client of windowClients) {
        console.info(client.url);
        if (client.url === url) {
          return client.focus();
        }
      }
      // open new window if no window
      return clients.openWindow(url);
    })
  );
});
