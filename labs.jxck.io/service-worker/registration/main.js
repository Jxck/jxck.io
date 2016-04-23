navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.log('updatefound');
    console.log(`installing: ${registration.installing}
waiting: ${registration.waiting}
active: ${registration.active}`);
  });

  console.log(navigator.serviceWorker.controller);
  return navigator.serviceWorker.ready;
}).then((registration) => {
    console.log(`installing: ${registration.installing}
waiting: ${registration.waiting}
active: ${registration.active}`);
}).catch(console.error.bind(console));
