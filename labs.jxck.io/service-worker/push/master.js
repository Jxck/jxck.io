'use strict';

const DEBUG = true;
const KEY = 'master.js?ver=1';

let log = DEBUG ? console.log.bind(console) : () => {};

// window
if (typeof window !== 'undefined') {
  navigator.serviceWorker.register(KEY).then((registration) => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
    }).then((subscription) => {
      log(JSON.stringify(subscription, ' ', ' '));
    });
  }).catch(console.error.bind(console));
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (event) => {
    e.waitUntil(self.skipWaiting());
    log('installed', event);
  });

  self.addEventListener('activate', (event) => {
    e.waitUntil(self.clients.claim());
    log('activated', event);
  });

  self.addEventListener('push', (event) => {
    log('pushed message', event);
    let message = event.data.text();
    event.waitUntil(
      self.registration.showNotification('hoge', {
        body: message,
        icon: '/service-worker/push/jxck.png',
        tag: 'my-tag',
      })
    );
  });

  self.addEventListener('notificationclick', (event) => {
    log('notification click: tag ', event.notification.tag);
    event.notification.close();
    const url = 'https://labs.jxck.io/service-worker/push/';
    event.waitUntil(
      clients.matchAll({
        type: 'window'
      })
      .then((windowClients) => {
        Array.from(windowClients).forEach((client) => {
          log(client.url);
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
}
