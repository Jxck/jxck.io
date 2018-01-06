'use strict';
let log = console.log.bind(console);

// server vapid public key
const publicKey = "BCy0bVkTnomzlkx76DslhE22JiOqsytkZJaQQ4lyct3HCDspcLh6eTfcSMzUacw6KBkkEUebNFYuMBYCoBRqWKM";

(async function() {
  try {
    // register service worker
    await navigator.serviceWorker.register('worker.js')
    const registration = await navigator.serviceWorker.ready

    const currentSubscription = await registration.pushManager.getSubscription()
    if (currentSubscription) {
      console.log(currentSubscription)
      await currentSubscription.unsubscribe()
    }

    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: urlsafeBase64ToBinary(publicKey),
      userVisibleOnly:      true
    })

    console.log(subscription);

    // subscription values
    const endpoint = subscription.endpoint;
    const auth     = subscription.getKey('auth');
    const p256dh   = subscription.getKey('p256dh');
    const sub = {
      endpoint,
      keys: {
        auth:   btoa(String.fromCharCode(...new Uint8Array(auth))),
        p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
      }
    }


    // check permission
    const result = await Notification.requestPermission()
    document.querySelector('#permission').textContent = result


    // form submit
    document.querySelector('form').addEventListener('submit', async (e) => {
      try {
        e.preventDefault()
        const data  = new FormData(e.target)
        console.log(data)
        const title = data.get('title')
        const options  = {
          body:               data.get('body'),
          icon:               data.get('icon'),
          image:              data.get('image'),
          dir:                data.get('dir'),
          lang:               data.get('lang'),
          tag:                data.get('tag'),
          badge:              data.get('badge'),
          sound:              data.get('sound'),
          timestamp:          data.get('timestamp'),
          vibrate:            JSON.parse(data.get('vibrate')),
          renotify:           JSON.parse(data.get('renotify')),
          silent:             JSON.parse(data.get('silent')),
          requireInteraction: JSON.parse(data.get('requireInteraction')),
          data:               {foo: "bar"},
          actions:            [
            {action: 'action1', title: 'action1'},
            {action: 'action2', title: 'action2'},
          ]
        }
        console.log(options)

        const body = JSON.stringify({ sub, title, options })
        const method = 'post'


        // send to server
        const res = await fetch('push.cgi', { method, body })
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    })

  } catch (err) {
    console.log(err)
  }
})();


const urlsafeBase64ToBinary = (urlsafeBase64) => {
    const base64 = urlsafeBase64.replace(/-/g, '+').replace(/_/g, '/');
    const raw    = window.atob(base64);
    const binary = new Uint8Array(raw.length);

    for (let i = 0, len = binary.length; i < len; i++) {
        binary[i] = raw.charCodeAt(i);
    }

    return binary;
};
