importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

console.log(workbox);


const {precacheAndRoute} = workbox.precaching

precacheAndRoute([
  {url: "assets/a.css?v1", revision: null},
  {url: "assets/b.css?v1", revision: null},
  {url: "assets/c.css?v1", revision: null},
  {url: "assets/x.js?v1",  revision: null},
  {url: "assets/y.js?v1",  revision: null},
  {url: "assets/z.js?v1",  revision: null},
])


const {registerRoute} = workbox.routing
const {CacheFirst} = workbox.strategies

registerRoute(
  ({url}) => {
    return url.pathname.startsWith("/service-worker/workbox/assets/")
  },
  new CacheFirst()
);
