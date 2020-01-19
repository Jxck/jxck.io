'use strict'

const CACHE_KEY = 'push-cache'

function base64url(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const raw    = atob(base64)
  const arr    = Array.from(raw).map((c) => c.charCodeAt(0))
  const bin    = new Uint8Array(arr)
  return bin
}

(async function() {
  try {
    // server vapid public key
    const {publicKey, privateKey} = await (await fetch('vapid-keys.json')).json()
    console.log(publicKey, privateKey)

    // register service worker
    await navigator.serviceWorker.register('worker.js')
    const registration = await navigator.serviceWorker.ready

    const currentSubscription = await registration.pushManager.getSubscription()
    if (currentSubscription) {
      console.log(currentSubscription)
      await currentSubscription.unsubscribe()
    }

    console.log(base64url(publicKey))
    const subscription = await registration.pushManager.subscribe({
      applicationServerKey: base64url(publicKey),
      userVisibleOnly:      true
    })

    console.log(subscription)

    // subscription values
    const endpoint = subscription.endpoint
    const auth     = subscription.getKey('auth')
    const p256dh   = subscription.getKey('p256dh')
    const sub = {
      endpoint,
      keys: {
        auth:   btoa(String.fromCharCode(...new Uint8Array(auth))),
        p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
      }
    }

    // check permission
    const result = await Notification.requestPermission()
    console.log(result)
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
          data:               JSON.parse(data.get('data')),
          actions:            JSON.parse(data.get('actions')),
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
})()
