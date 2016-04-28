console.info('worker');

self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).catch(console.error.bind(console))
  );
});

self.addEventListener('message', (message) => {
  const n = JSON.parse(message.data).n;
  const m = 10;
  const key = '/service-worker/random';
  return caches.open(key).then((cache) => {
    let urls = Array.from(Array(m).keys()).map((i) => `${key}?${i+m*n}`);
    console.info(`cache ${n} requests`);
    return cache.addAll(urls);
  });
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});
