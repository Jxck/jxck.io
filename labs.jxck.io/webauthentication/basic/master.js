'use strict';

// TODO: make me es module if https://crbug.com/680046 fixed
// import {b64enc, b64dec} from './base64.js'

let log = console.log.bind(console);

document.addEventListener('DOMContentLoaded', async () => {

  document.querySelector('#register').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const username = formdata.get('username')
    console.log({username})

    const res = await fetch('register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    })
    const publicKeyOpt = await res.json()
    console.log(publicKeyOpt)


    publicKeyOpt.challenge = b64dec(publicKeyOpt.challenge);
    publicKeyOpt.user.id   = b64dec(publicKeyOpt.user.id);

    const {id, type, rawId, response} = await navigator.credentials.create({publicKey: publicKeyOpt})
    console.log(response)

    const body = {
      id,
      type,
      rawId: b64enc(new Uint8Array(rawId)),
      response: {
        attestationObject: b64enc(new Uint8Array(response.attestationObject)),
        clientDataJSON:    b64enc(new Uint8Array(response.clientDataJSON)),
      }
    }
    console.log(body)


    const res2 = await fetch('credential', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    console.log(await res2.json())

  })



  const registration = await navigator.serviceWorker.register('worker.js', {type: "module"});
  await navigator.serviceWorker.ready;


})
