'use strict';

const DEBUG = false;
const KEY = "master.js?ver=1";

let log = DEBUG ? console.log.bind(console) : ()=>{}

// window
if (typeof window !== 'undefined') {
  navigator.serviceWorker.register(KEY).then((registration) => {
    registration.addEventListener('updatefound', (e) => {
      log('updatefound', e);
      log('registration.installing', registration.installing);
      log('registration.waiting', registration.waiting);
      log('registration.active', registration.active);
    });
    log(navigator.serviceWorker.controller);
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
    log(registration);
  }).catch(console.error.bind(console));
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (e) => {
    log('install', e);
    e.waitUntil(skipWaiting());
  });

  self.addEventListener('activate', (e) => {
    log('activate', e);
    e.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', (e) => {
    let req = e.request;
    e.respondWith(
      caches.open(KEY).then((cache) => {
        return cache.match(req).then((res) => {
          let update = fetch(req).then((res) => {
            cache.put(req, res.clone());
            return res;
          });
          return res || update;
        })
      })
    );
  });
}
