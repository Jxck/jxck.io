'use strict';

const DEBUG = true;
const KEY = 'master.js?ver=2';

let log = DEBUG ? console.log.bind(console) : () => {};

// window
if (typeof window !== 'undefined') {
  navigator.serviceWorker.register(KEY).then((registration) => {
    return navigator.serviceWorker.ready;
  }).then((registration) => {
    log(navigator.serviceWorker.controller);
    return registration.sync.register('update-cache');
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
    e.waitUntil(self.clients.claim());
  });

  self.addEventListener('sync', (e) => {
    log('sync', e);
    localStorage.setItem('sync', JSON.stringify(e));
  });
}
