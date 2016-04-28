console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
  return navigator.serviceWorker.ready;
});

let n = 0;

let timer = null;
document.getElementById('cache').addEventListener('click', () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    return;
  }
  timer = setInterval(() => {
    let chan = new MessageChannel();
    let message = JSON.stringify({ n: n++ });
    navigator.serviceWorker.controller.postMessage(message, [chan.port2]);
    navigator.storageQuota.queryInfo("temporary").then(console.log.bind(console));
  }, 1000);
});

