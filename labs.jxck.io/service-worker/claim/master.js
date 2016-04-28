console.log('master');

document.getElementById('button').addEventListener('click', () => {
  fetch('/service-worker/claim/test');
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
});
