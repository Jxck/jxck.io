'use strict';

(() => {
  let p = console.log.bind(console);
  p('fetch2.js');

  const ver = 'fetch2.js';
  self.addEventListener('install', (e) => {
    console.info(` install${ver}`, e);
  });

  self.addEventListener('fetch', (e) => {
    p('fetch2.js');
    let path = new URL(e.request.url).pathname;
    console.log(path);
    if (path.indexOf('test') > -1) {
      e.respondWith(new Response('test2'));
    }
    return;
  });
})();
