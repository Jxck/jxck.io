importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

console.log(workbox);


const {precacheAndRoute} = workbox.precaching;

precacheAndRoute([
  "assets/a.css?v1",
  "assets/b.css?v1",
  "assets/c.css?v1",
  "assets/x.js?v1",
  "assets/y.js?v1",
  "assets/z.js?v1",
])
