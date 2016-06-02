'use strict';
let p = console.log.bind(console);

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true, });
}).then((subscription) => {
  console.log(JSON.stringify(subscription, ' ', ' '));

  const endpoint = subscription.endpoint;
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
  const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

  const body = JSON.stringify({ endpoint, userAuth, userPublicKey });
  console.log(body);

  const url = 'wss://ws.jxck.io';
  const protocol = 'push-register';
  let ws = new WebSocket(url, protocol);

  ws.addEventListener('message', (e) => {
    console.log('message', e);
  });
  ws.addEventListener('open', () => {
    ws.send(body);
  });
  ws.addEventListener('error', (e) => {
    console.error(e);
  });

}).catch(console.error.bind(console));
