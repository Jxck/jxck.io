console.log('master');

navigator.serviceWorker.register('worker1.js', { scope: './' }).then((registration) => {
  return navigator.serviceWorker.ready;
});

navigator.serviceWorker.register('worker2.js', { scope: './' }).then((registration) => {
  return navigator.serviceWorker.ready;
});

document.getElementById('button').addEventListener('click', () => {
  fetch('test').then((res) => res.text()).then(console.log.bind(console));
});
