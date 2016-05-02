navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  registration.pushManager.subscribe({
    userVisibleOnly: true,
  }).then((subscription) => {
    console.log(JSON.stringify(subscription, ' ', ' '));
  });
}).catch(console.error.bind(console));
