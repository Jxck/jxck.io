'use strict';

const DEBUG = true;
const KEY = 'master.js?ver=1';

let log = DEBUG ? console.log.bind(console) : () => {};

// window
if (typeof window !== 'undefined') {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register(KEY).then(function(reg) {
    console.log(':^)', reg);
    reg.pushManager.subscribe({
      userVisibleOnly: true
    }).then(function(subscription) {
      console.log(JSON.stringify(subscription, ' ', ' '));
    });
  }).catch(function(err) {
    console.log(':^(', err);
  });
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  console.log('Started', self);
  self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Installed', event);
  });

  self.addEventListener('activate', function(event) {
    console.log('Activated', event);
  });

  self.addEventListener('push', function(event) {
    console.log('Push message', event);
    var message = event.data.text();
    event.waitUntil(
      self.registration.showNotification('hoge', {
        body: message,
        icon: '/service-worker/push/jxck.png',
        tag: 'my-tag'
      }));
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://labs.jxck.io/service-worker/push/';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                console.log(client.url);
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
}
