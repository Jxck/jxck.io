'use strict';

// window
if (navigator.serviceWorker === undefined) {
  alert('service worker not supported');
}

navigator.serviceWorker.addEventListener('controllerchange', console.log.bind(console));

navigator.serviceWorker.register('worker.js', { scope: '.' }).then((worker) => {
  // console.log('register success', worker.scope);
  return navigator.serviceWorker.ready;
}).then((worker) => {
  // console.log('active worker', worker);
  console.log('controller', navigator.serviceWorker.controller);
}).catch(console.error.bind(console));


//window.addEventListener('DOMContentLoaded', () => {
//  setInterval(() => {
//    fetch('/test').then((res) => {
//      console.log(res);
//    });
//  }, 1000);
//});
