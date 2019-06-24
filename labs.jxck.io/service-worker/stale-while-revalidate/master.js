'use strict';

const DEBUG = true
const KEY   = 'master.js'
const Ver   = 'v1'

EventTarget.prototype.on = EventTarget.prototype.addEventListener

// window
if (typeof window !== 'undefined') {
  const $  = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  document.on('DOMContentLoaded', async (e) => {
    console.log(e)

    $('#test').on('click', async (e) => {
      console.log(await fetch('https://labs.jxck.io/service-worker/stale-while-revalidate/', {mode: 'cors'}))
    })

    const registration = await navigator.serviceWorker.register(KEY)
    navigator.serviceWorker.addEventListener('controllerchange', (e) => {
      console.log(e)
    })

    registration.on('updatefound', (e) => {
      console.log(e.type)
      //console.log('registration.installing', registration.installing)
      //console.log('registration.waiting',    registration.waiting)
      //console.log('registration.active',     registration.active)
    })

    console.log(await navigator.serviceWorker.ready)

    if (!navigator.serviceWorker.controller) {
      await new Promise((done) => {
        navigator.serviceWorker.addEventListener('controllerchange', done)
      })
    }
    console.log(navigator.serviceWorker.controller)
  })
}

if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener('install', (e) => {
    console.log(e.type)

    e.waitUntil((async function() {
      try {
        const cache = await caches.open(Ver)

        const requests = [
          new Request('.'),
          new Request('master.js'),
          new Request('/favicon.ico'),
          new Request('test.html'),
          new Request('https://logo.jxck.io/jxck.60x60.png', {mode:'no-cors'}),
        ]

        requests.forEach(async (req) => {
          const res = await fetch(req)
          console.log(res.url)
          await cache.put(req, res.clone())
        })
        console.log(await skipWaiting())
        return
      } catch(err) {
        console.error(err)
      }
    })())
  })
  self.addEventListener('activate', (e) => {
    console.log(e.type)
    e.waitUntil(self.clients.claim());
  })
  self.addEventListener('fetch', (e) => {
    console.log(e.type)

    //e.respondWith(caches.match(e.request))
    e.respondWith((async function() {
      try {
        const req = e.request
        console.warn(req.url)

        const cache = await caches.open(Ver)
        console.log(cache)

        const cached = await cache.match(req)
        console.log(cached)

        if (cached) {
          console.warn('======= cache hit', cached)
          return cached
        }

        const res = await fetch(req)
        console.log(res)

        e.waitUntil(
          cache.put(req, res.clone())
        )
        return res
      } catch(err) {
        console.error(err)
      }
    })())
  })
}











// // worker
// if ('ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope) {
//   self.addEventListener('install', (e) => {
//     log('install > skipWaiting', e);
//     e.waitUntil(skipWaiting());
//   });
// 
//   self.addEventListener('activate', (e) => {
//     log('activate > claim', e);
// 
//     e.waitUntil(
//       caches.keys().then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             console.log('remove cache', cacheName);
//             return caches.delete(cacheName);
//           })
//         );
//       }).then(() => {
//         return fetch('feeds/atom.json');
//       }).then((res) => {
//         return res.json();
//       }).then((json) => {
//         let urls = json.entry.map((e) => new URL(e.href).pathname);
//         return caches.open(KEY).then((cache) => {
//           console.log('addall', urls, cache);
//           return cache.addAll(urls);
//         });
//       }).then(() => self.clients.claim())
//     );
//   });
// 
//   self.addEventListener('fetch', (e) => {
//     let request = e.request;
//     console.log(request);
// 
//     let url = new URL(request.url);
//     if (url.pathname === '/master.js') return;
// 
//     e.respondWith(
//       caches.open(KEY).then((cache) => {
//         return cache.match(request).then((response) => {
//           if (response) {
//             console.log('cached res', response, response.headers && response.headers.get('x-seq'));
//           }
// 
//           let update = fetch(request).then((update) => {
//             let type = update.headers.get('content-type');
// 
//             console.log('update', update, update.headers.get('x-seq'));
// 
//             cache.put(request, update.clone());
//             return update;
//           });
// 
//           return Promise.race([
//             new Promise((resolve, reject) => {
//               if(!!response) {
//                 resolve(response);
//               }
//             }),
//             update
//           ]);
//         }).catch((e) => {
//           console.log(e);
//           return e;
//         });
//       })
//     );
//   });
// }
