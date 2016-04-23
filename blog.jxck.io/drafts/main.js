console.log('master');
navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
  console.log('registration');

}).catch(console.error.bind(console));


document.getElementById('button').addEventListener('click', () => {
  fetch('/test.html').then((e) => {
    console.log(e);
  });
});
