console.info('worker1');

const ver = 1;

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path.indexOf('test') > -1) {
    e.respondWith(new Response('worker 1'));
  }
  return;
});
