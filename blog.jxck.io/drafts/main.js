
navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
  console.log(' installing', registration.installing);
  return navigator.serviceWorker.ready;
}).then((registration) => {
  console.log(' active', registration.active);

  return new Promise((resolve, reject) => {
    navigator.serviceWorker.addEventListener('controllerchange', resolve);
  });
}).then(() => {
  console.log(navigator.serviceWorker.controller);
}).catch(console.error.bind(console));

document.getElementById('button').addEventListener('click', () => {
  fetch('/test.html').then((e) => {
    console.log(e);
  });
});
