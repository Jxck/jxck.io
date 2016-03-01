'use strict';
let p = console.log.bind(console);

['install', 'activate', 'beforeevicted', 'evicted', 'fetch', 'message', 'push'].forEach((e) => {
  self.addEventListener(e, (ev) => {
    console.log(e, ev);
  });
});

self.addEventListener('activate', (e) => {
  console.log('claim on activate');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = (new URL(e.request.url)).pathname;
  console.log('fetch', path);

  if (path === '/test') {
    e.respondWith(new Response("world"));
  }
});
