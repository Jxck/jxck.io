console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
});
