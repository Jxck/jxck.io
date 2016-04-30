console.info('worker');

self.addEventListener('install', (e) => {
  console.info('install', e);
});

self.addEventListener('message', (message) => {
  const m = 10;
  const n = JSON.parse(message.data).n;
  const key = '/service-worker/random';
  return caches.open(key).then((cache) => {
    let urls = Array.from(Array(m).keys()).map((i) => `${key}?${i+m*n}`);
    console.info(`cache ${m*n} requests`);
    return cache.addAll(urls);
  });
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});
