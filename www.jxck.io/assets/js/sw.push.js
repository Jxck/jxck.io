/**
 * generic push notification handler
 * show notification -> open tab when clicked
 * pushed data should have
 * {
 *   tag,   // for showNotification
 *   title, // ..
 *   icon,  // ..
 *   body   // ..
 *   url,   // for open tab
 * }
 */
(() => {
  'use strict';
  let p = console.log.bind(console);

  self.addEventListener('push', (e) => {
    console.info('push', e);

    // parse pushed data
    let data = JSON.parse(e.data.text());
    console.info('data', data);

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
            for (let client of windowClients) {
              console.log(client, client.url);
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
