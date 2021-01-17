'use strict';
let p = console.log.bind(console);

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true });
}).then((subscription) => {
  console.log(subscription);

  const endpoint = subscription.endpoint;
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
  const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

  // send to server
  const body = {endpoint, userAuth, userPublicKey};

  console.log(body);

}).catch(console.error.bind(console));
