console.info(' worker');

self.addEventListener('install', (e) => {
  console.info(` install`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate`, e);
});

self.addEventListener('sync', (e) => {
  console.info(` sync`, e);
  return fetch('/test.html').then(console.log.bind(console));
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  if (path === '/test.html') {
    e.respondWith(new Response('test'));
  }
  return;
});
