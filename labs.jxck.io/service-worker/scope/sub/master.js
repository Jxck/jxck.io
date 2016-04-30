console.log('master');

navigator.serviceWorker.register('worker.js', { scope: './' }).then((registration) => {
  return navigator.serviceWorker.ready;
});

document.getElementById('button').addEventListener('click', () => {
  fetch('test').then((res) => res.text()).then(console.log.bind(console));
});
