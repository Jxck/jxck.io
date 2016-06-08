navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  // register sync
  document.getElementById('button').addEventListener('click', () => {
    registration.sync.register('sync-data').then(() => {
      console.log('sync registered');
    }).catch(console.error.bind(console));
  });
}).catch(console.error.bind(console));
