(function() {
  'use strict';
  const DEBUG = true;
  const VERSION='ver=2';

  let log = DEBUG ? console.log.bind(console) : () => {};

  // window
  if (typeof window !== 'undefined') {
    let registerPush = ((registration) => {
      registration.pushManager.subscribe({userVisibleOnly: true}).then((subscription) => {
        const endpoint = subscription.endpoint;
        const auth = subscription.getKey('auth');
        const p256dh = subscription.getKey('p256dh');

        const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
        const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

        const body = JSON.stringify({ endpoint, userAuth, userPublicKey });
        console.log(JSON.stringify(subscription, ' ', ' '));
        console.log(body);

        const url = 'wss://ws.jxck.io';
        const protocol = 'push_register';
        let ws = new WebSocket(url, protocol);

        ws.addEventListener('message', (e) => {
          console.log('message', e);
        });
        ws.addEventListener('open', () => {
          ws.send(body);
        });
        ws.addEventListener('error', (e) => {
          console.error(e);
        });
      });
    });

    let controllerChange = new Promise((resolve, reject) => {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        resolve(navigator.serviceWorker.controller);
      });
    });

    navigator.serviceWorker.register(`/assets/js/sw.js?${VERSION}`, { scope: '/' }).then((registration) => {
      return navigator.serviceWorker.ready;
    }).then((registration) => {
      // TODO: disable push while WIP
      // registerPush(registration);
      if (navigator.serviceWorker.controller) {
        return navigator.serviceWorker.controller;
      }
      return controllerChange;
    }).then((controller) => {
      log('controller', controller);
    }).catch(console.error.bind(console));
  }

  // service worker
  if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
    // TODO: disable push while WIP
    // importScripts(`sw.push.js?${VERSION}`);

    self.addEventListener('install', (e) => {
      log('install > skipWaiting', e);
      e.waitUntil(skipWaiting());
    });

    self.addEventListener('activate', (e) => {
      log('activate > claim', e);
      e.waitUntil(self.clients.claim());
    });
  }
})();
