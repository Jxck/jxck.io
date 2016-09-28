self.addEventListener('install', event => {
  event.registerForeignFetch({
    scopes: [self.registration.scope], // or self.registration.scope to handle everything
    origins: ['*'] // or ['https://client1.com'] to limit the remote origins
  });
});

self.addEventListener('foreignfetch', event => {
  event.respondWith(
    fetch(event.request) // Try to make a network request
    .catch(() => new Response('34')) // Offline? Your random number is 34!
    .then(response => {
      return {
        response,
        origin: event.origin // Make this a CORS response
      };
    })
  );
});
