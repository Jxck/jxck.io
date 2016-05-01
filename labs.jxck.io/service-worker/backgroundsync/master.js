navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  document.getElementById('button').addEventListener('click', () => {
    registration.sync.register('update-cache').then(() => {
      console.log('sync registered');
    }).catch(console.error.bind(console));
  });
}).catch(console.error.bind(console));
