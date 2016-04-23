console.log('master');
navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
  console.log('registration');
  return registration.sync.register('update-cache');
}).catch(console.error.bind(console));
