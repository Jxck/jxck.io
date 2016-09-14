'use strict';
let p = console.log.bind(console);

window.onload = () => {
  push_handler();
}

function push_handler() {
  let $push = document.getElementById('push');
  const permission = Notification.permission;
  console.log(permission);
  $push.className = permission;

  $push.addEventListener('click', () => {
    console.log($push.className);
    if ($push.className === 'default') {
      return register().then(() => {
        return push_handler();
      });
    }
  });
}

function register() {
  return navigator.serviceWorker.register('worker.js').then((registration) => {
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
}
