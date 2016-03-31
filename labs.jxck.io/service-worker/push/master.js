'use strict';

const DEBUG = true;
const KEY = 'master.js?ver=1';

let log = DEBUG ? console.log.bind(console) : () => {};

// window
if (typeof window !== 'undefined') {
  navigator.serviceWorker.register(KEY).then((registration) => {
    return registration.pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        return subscription;
      }
      return registration.pushManager.subscribe({
        userVisibleOnly: true
      });
    })
  }).then((subscription) => {
    console.log('pushManager', subscription.endpoint);
  }).catch((error) => {
    console.error('serviceWorker error:', error);
  });
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  const TITLE = 'Push Demo | labs.jxck.io';
  const BODY = {
    icon: '/service-worker/push/jxck.png',
    body: 'this is pushed from jxck.io',
    tag: 'labs-jxck-io-tag',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  }
  self.addEventListener('push', (event) => {
    event.waitUntil(
      self.registration.showNotification(TITLE, BODY)
    );
  });
}
