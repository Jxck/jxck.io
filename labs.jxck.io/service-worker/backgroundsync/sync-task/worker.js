self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (e) => {
  console.log('sync', e);
});

self.addEventListener('fetch', (e) => {
  console.log('fetch', e);
  if (e.request.method === "POST") {
    e.respondWith(new Response(null, {status: 202}));
  }
});
