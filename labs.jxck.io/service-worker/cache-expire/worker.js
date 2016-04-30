console.info('worker');

// set cache-control: max-age=10

const key = 'cache-expire';
const urls = ['/', 'master.js', 'worker.js'];
self.addEventListener('install', (e) => {
  console.info('install', e);
  return caches.open(key).then((cache) => {
    return cache.addAll(urls);
  });
});


self.addEventListener('fetch', (e) => {
  console.info('fetch', e);
  e.respondWith(caches.open(key).then((cache) => {
    return cache.match(e.request);
  }));
});
