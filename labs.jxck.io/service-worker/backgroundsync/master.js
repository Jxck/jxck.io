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
    log(registration.sync.register('update-cache'));
  }).catch(console.error.bind(console));
}

const CACHE = 'cache';

// worker
if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (e) => {
    log('install > skipWaiting', e);
    e.waitUntil(skipWaiting());
  });

  self.addEventListener('activate', (e) => {
    log('activate > claim', e);
    return self.clients.claim();
  });

  self.addEventListener('sync', (e) => {
    console.log('sync', e.tag);

    if (e.tag !== 'update-cache') return;

    e.waitUntil(caches.open(CACHE).then((cache) => {
      return fetch('atom.json').then((res) => {
        return res.json();
      }).then((json) => {
        return json.entry.map((e) => e.href);
      }).then((responses) => {
        return cache.addAll(responses);
      });
    }));
  });
}
