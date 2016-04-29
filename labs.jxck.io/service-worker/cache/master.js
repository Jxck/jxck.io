console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
  return navigator.serviceWorker.ready;
});

let n = 0;
let timer = null;

let log = document.getElementById('log');

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
    navigator.storageQuota.queryInfo("temporary").then((info) => {
      log.value += (`cache: ${n}, usage: ${info.usage}, quota: ${info.quota}\n`);
    });
  }, 1000);
});
