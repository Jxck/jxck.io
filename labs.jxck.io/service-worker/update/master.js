console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });

  setInterval(() => {
    console.log('update');
    registration.update();
  }, 3000);
  return navigator.serviceWorker.ready;
});
