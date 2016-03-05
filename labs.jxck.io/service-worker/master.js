'use strict';

const KEY = "master.js?ver=1";

// window
if (typeof window !== 'undefined') {
  navigator.serviceWorker.register(KEY).then((registration) => {
    registration.addEventListener('updatefound', (e) => {
      console.log('updatefound', e);
      console.log('registration.installing', registration.installing);
      console.log('registration.waiting', registration.waiting);
      console.log('registration.active', registration.active);
    });
    console.log(navigator.serviceWorker.controller);
    return navigator.serviceWorker.ready;
  }).then((registration) => {
    if (navigator.serviceWorker.controller) {
      return registration;
    }
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        resolve(registration);
      });
    });
  }).then((registration) => {
    console.log(registration);
  }).catch(console.error.bind(console));
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (e) => {
    console.log('install', e);
    e.waitUntil(skipWaiting());
  });

  self.addEventListener('activate', (e) => {
    console.log('activate', e);
    e.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', (e) => {
    let req = e.request.clone();
    caches.open(KEY).then((cache) => {
      return cache.match(req).then((res) => {
        if (res) {
          console.log('cache hit', res.url);
          //fetch(req).then((res) => {
          //  console.log('cache update', res.url);
          //  cache.put(req, res);
          //});
          return res;
        }
        return fetch(req).then((res) => {
          console.log('fetch', res.url);
          cache.put(req, res);
          return res;
        });
      });
    });
  });
}
