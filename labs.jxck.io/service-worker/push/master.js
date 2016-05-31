navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true, });
}).then((subscription) => {
  console.log(JSON.stringify(subscription, ' ', ' '));

  // Retrieve the user's public key.
  const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
  const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
  key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
  authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
  endpoint = subscription.endpoint;

  body = JSON.stringify({
    endpoint: subscription.endpoint,
    key: key,
    authSecret: authSecret,
  })

  console.log(body);
  window.b = JSON.parse(body);
}).catch(console.error.bind(console));
