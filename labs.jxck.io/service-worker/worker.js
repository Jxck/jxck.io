'use strict';

const CACHE_KEY = "worker.js?ver=11";

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
  caches.open(CACHE_KEY).then((cache) => {
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
