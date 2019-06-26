'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener


let registerPush = ((registration) => {
  registration.pushManager.subscribe({userVisibleOnly: true}).then((subscription) => {
    const endpoint = subscription.endpoint;
    const auth = subscription.getKey('auth');
    const p256dh = subscription.getKey('p256dh');

    const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
    const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

    const body = JSON.stringify({ endpoint, userAuth, userPublicKey });
    console.log(JSON.stringify(subscription, ' ', ' '));
    console.log(body);

    const url = 'wss://ws.jxck.io';
    const protocol = 'push_register';
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
  });
});
