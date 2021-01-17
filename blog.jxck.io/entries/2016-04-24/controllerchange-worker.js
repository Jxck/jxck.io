console.info('worker');

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path === '/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
