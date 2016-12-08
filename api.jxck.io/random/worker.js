self.addEventListener('install', (e) => {
  console.log('install');
  e.registerForeignFetch({
    scopes: ['/random/number'], // or self.registration.scope to handle everything
    origins: ['*'] // or ['https://client1.com'] to limit the remote origins
  });
});

self.addEventListener('activate', (e) => {
  console.log('activate');
});

self.addEventListener('fetch', (e) => {
  console.log('fetch');
});

self.addEventListener('foreignfetch', (e) => {
  console.log('foreignfetch');
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        console.log('online response');
        return {
          response,
          origin: e.origin // Make this a CORS response
        };
      })
      .catch(() => {
        console.log('offline response');
        return {
          response: new Response(Math.floor(Math.random()*100)),
          origin: e.origin // Make this a CORS response
        };
      })
  );
});
