navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('master');
  return navigator.serviceWorker.ready;
});
