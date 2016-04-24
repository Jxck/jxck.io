console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
});

document.getElementById('test').addEventListener('click', () => {
  fetch('test').then((e) => {
    console.log(e);
  });
});
