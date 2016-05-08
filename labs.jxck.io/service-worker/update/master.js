console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });

  return navigator.serviceWorker.ready;
}).then((registration) => {
  setInterval(() => {
    console.log('update()');
    registration.update();
  }, 1000);
});
