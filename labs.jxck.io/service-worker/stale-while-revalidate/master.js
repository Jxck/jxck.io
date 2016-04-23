'use strict';

const DEBUG = true;
const KEY = 'master.js?ver=2';

let log = DEBUG ? console.log.bind(console) : () => {};

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
        return resolve(registration);
      });
    });
  }).then((registration) => {
    log(registration);
  }).catch(console.error.bind(console));
}

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (e) => {
    log('install > skipWaiting', e);
    e.waitUntil(skipWaiting());
  });

  self.addEventListener('activate', (e) => {
    log('activate > claim', e);

    e.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('remove cache', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        return fetch('feeds/atom.json');
      }).then((res) => {
        return res.json();
      }).then((json) => {
        let urls = json.entry.map((e) => new URL(e.href).pathname);
        return caches.open(KEY).then((cache) => {
          console.log('addall', urls, cache);
          return cache.addAll(urls);
        });
      }).then(() => self.clients.claim())
    );
  });

  self.addEventListener('fetch', (e) => {
    let request = e.request;
    console.log(request);

    let url = new URL(request.url);
    if (url.pathname === '/master.js') return;

    e.respondWith(
      caches.open(KEY).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            console.log('cached res', response, response.headers && response.headers.get('x-seq'));
          }

          let update = fetch(request).then((update) => {
            let type = update.headers.get('content-type');

            console.log('update', update, update.headers.get('x-seq'));

            cache.put(request, update.clone());
            return update;
          });

          return Promise.race([
            new Promise((resolve, reject) => {
              if(!!response) {
                resolve(response);
              }
            }),
            update
          ]);
        }).catch((e) => {
          console.log(e);
          return e;
        });
      })
    );
  });
}
