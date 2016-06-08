'use strict';

(() => {
  let p = console.log.bind(console);
  p('fetch1.js');

  self.addEventListener('fetch', (e) => {
    p('fetch1.js');
    let path = new URL(e.request.url).pathname;
    console.log(path);
    if (path.indexOf('foo') > -1) {
      e.respondWith(new Response('foo'));
    }
    return;
  });
})();
