const CACHE = "foreign-fetch";
self.addEventListener('install', (e) => {
  console.info('install', e);

  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        '.',
        './index.html',
        './worker.js'
      ])
    })
  );
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);

  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  console.info('fetch', e.request);

  e.respondWith(
    caches.open(CACHE).then((cache) => {
      return cache.match(e.request).then((cached) => {
        console.log('cached', cached);
        return cached || fetch(e.request);
      }).catch(console.error.bind(console))
    })
  );
});
