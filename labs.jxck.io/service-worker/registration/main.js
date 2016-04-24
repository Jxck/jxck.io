console.log('master');

let controllerChange = new Promise((resolve, reject) => {
  navigator.serviceWorker.addEventListener('controllerchange', (e) => {
    resolve(e.target.controller);
  });
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  if (navigator.serviceWorker.controller) {
    return navigator.serviceWorker.controller;
  }
  return controllerChange;
}).then((controller) => {
  console.log(controller);
  return fetch('/test');
}).then((res) => {
  console.log(res);
});

document.getElementById('test').addEventListener('click', () => {
  fetch('test').then((e) => {
    console.log(e);
  });
});
