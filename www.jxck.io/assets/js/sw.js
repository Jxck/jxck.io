(function() {
  'use strict';
  const DEBUG = true;
  const KEY = '/assets/js/sw.js?ver=0';

  let log = DEBUG ? console.log.bind(console) : () => {};

  // window
  if (typeof window !== 'undefined') {
    if(location.search !== '?sw') return;

    let controllerChange = new Promise((resolve, reject) => {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        resolve(navigator.serviceWorker.controller);
      });
    });

    navigator.serviceWorker.register(KEY, { scope: '/' }).then((registration) => {
      return navigator.serviceWorker.ready;
    }).then(() => {
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
