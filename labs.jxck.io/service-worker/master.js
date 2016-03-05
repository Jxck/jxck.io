'use strict';

navigator.serviceWorker.register('worker.js?ver=11').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.log('updatefound', e);
    console.log('registration.installing', registration.installing);
    console.log('registration.waiting', registration.waiting);
    console.log('registration.active', registration.active);
  });

  console.log(navigator.serviceWorker.controller);
  return navigator.serviceWorker.ready;
}).then((registration) => {
  if (navigator.serviceWorker.controller) {
    return registration;
  }
  return new Promise((resolve, reject) => {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      resolve(registration);
    });
  });
}).then((registration) => {
  console.log(registration);
}).catch(console.error.bind(console));
