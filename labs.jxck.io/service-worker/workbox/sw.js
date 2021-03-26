importScripts('assets/workbox-v6.1.2/workbox-sw.js');
importScripts('assets/workbox-v6.1.2/workbox-core.prod.js');
importScripts('assets/workbox-v6.1.2/workbox-routing.prod.js');
importScripts('assets/workbox-v6.1.2/workbox-strategies.prod.js');
importScripts('assets/workbox-v6.1.2/workbox-precaching.prod.js');

console.log(workbox);


const {PrecacheController} = workbox.precaching
const {registerRoute, Router} = workbox.routing
const {CacheFirst} = workbox.strategies

console.log(Router)

const router = new Router();


//import {registerRoute} from 'workbox-routing';
//import {CacheFirst} from 'workbox-strategies';
//
//registerRoute(
//  ({request}) => request.destination === 'style',
//  new CacheFirst()
//);

const precacheController = new PrecacheController();
precacheController.addToCacheList([
  {url: "assets/a.css?v1", revision: null},
  {url: "assets/b.css?v1", revision: null},
  {url: "assets/c.css?v1", revision: null},
  {url: "assets/x.js?v1",  revision: null},
  {url: "assets/y.js?v1",  revision: null},
  {url: "assets/z.js?v1",  revision: null},
])





router.registerRoute(
  ({url}) => {
    return url.pathname.startsWith("/service-worker/workbox/assets/")
  },
  new CacheFirst()
)




self.addEventListener('install', (event) => {
  console.log(event)

  precacheController.install(event)
})

self.addEventListener('activate', (event) => {
  console.log(event)
  precacheController.activate(event)
})

self.addEventListener('fetch', (event) => {
  console.log(event.request)

  const responsePromise = router.handleRequest(event);
  console.log(responsePromise)
  if (responsePromise) {
    // Router found a route to handle the request
    event.respondWith(responsePromise);
  }
  return
})

