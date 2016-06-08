'use strict';

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true, });
})

// TODO
((registration) => {

  Notification.requestPermission((permission) => {
    if (permission !== 'denied') {
      sw.pushManager.subscribe().then((subscription) => {
        //
      });
    }
  });

  registration.pushManager.hasPermission().then((pushPermissionStatus) => {
    // Once we have a service worker, and checked permission,
    // enable the buttons
    var buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'block';

    // If we don't have permission then set the UI accordingly
    if (pushPermissionStatus !== 'granted') {
      changeState(STATE_NOTIFICATION_PERMISSION);
      return;
    }

    // We have permission, so let's update the subscription
    // just to be safe
    serviceWorkerRegistration.pushManager.getSubscription().then((pushSubscription) => {
      // Check if we have an existing pushSubscription
      if (pushSubscription) {
        sendSubscription(pushSubscription);
        changeState(STATE_ALLOW_PUSH_SEND);
      } else {
        changeState(STATE_NOTIFICATION_PERMISSION);
      }
    });
  });



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
})();

// generic push notification handler
// show notification -> open tab when clicked
// pushed data should have
// {
//   tag,   // for showNotification
//   title, // ..
//   icon,  // ..
//   body   // ..
//   url,   // for open tab
// }
(() => {
  let p = console.log.bind(console);

  self.addEventListener('push', (e) => {
    console.info('push', e);

    // parse pushed data
    let data = JSON.parse(e.data.text());

    // prepare notification handler
    self.addEventListener('notificationclick', (e) => {
      // not for this push, do nothing
      if (e.notification.tag !== data.tag) return;

      console.info('notification click: tag', e.notification.tag);

      e.notification.close();
      e.waitUntil(
        clients
          .matchAll({ type: 'window' })
          .then((windowClients) => {
            // if window already exists
            for (client of windowClients) {
              if (client.url === data.url) {
                return client.focus();
              }
            }
            // open new window if no window
            return clients.openWindow(data.url);
          })
      );
    });

    // show notification
    e.waitUntil(
      self.registration.showNotification(data.title, data)
    );
  });
})();
