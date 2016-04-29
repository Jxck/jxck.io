navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.sync.register('update-cache');
}).catch(console.error.bind(console));
