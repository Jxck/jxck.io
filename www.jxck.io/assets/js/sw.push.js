'use strict';

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
