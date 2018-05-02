'use strict';

// TODO: make me es module if https://crbug.com/680046 fixed
// import {b64enc, b64dec} from './base64.js'

let log = console.log.bind(console);

document.addEventListener('DOMContentLoaded', async () => {

  // 登録
  document.querySelector('#register').addEventListener('submit', async (e) => {
    e.preventDefault()

    // username を取得
    const formdata = new FormData(e.target)
    const username = formdata.get('username')
    console.log({username})

    // username だけを送りサーバに登録をリクエスト
    // credential を作るための素材が返る
    const publicKeyOpt = await (async () => {
      const body = JSON.stringify({username})
      const res = await fetch('register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      return res.json()
    })()
    console.log(publicKeyOpt)

    // サーバからの情報を元に credential を作成する
    publicKeyOpt.challenge = b64dec(publicKeyOpt.challenge);
    publicKeyOpt.user.id   = b64dec(publicKeyOpt.user.id);

    // ここで Yubikey のタッチなどが求められる
    const {id, type, rawId, response} = await navigator.credentials.create({publicKey: publicKeyOpt})
    console.log(response)

    localStorage.setItem('rawId', b64enc(new Uint8Array(rawId)))

    // 結果を JSON で送る
    const {registered} = await (async () => {
      const body = JSON.stringify({
        id,
        type,
        rawId: b64enc(new Uint8Array(rawId)),
        response: {
          attestationObject: b64enc(new Uint8Array(response.attestationObject)),
          clientDataJSON:    b64enc(new Uint8Array(response.clientDataJSON)),
        }
      })
      console.log(body)
      const res = await fetch('credential', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      return res.json()
    })()
    console.log(registered)
    document.querySelector('#registered').textContent = registered
  })


  // Login
  document.querySelector('#login').addEventListener('submit', async (e) => {
    e.preventDefault()

    // username を取得
    const formdata = new FormData(e.target)
    const username = formdata.get('username')
    console.log({username})

    // username だけを送りサーバに登録をリクエスト
    // login するための素材が返る
    const challenge = await (async () => {
      const body = JSON.stringify({username})
      const res = await fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      return res.json()
    })()

    const rawId = b64dec(localStorage.getItem('rawId'))

    // サーバからの情報を元に credential を作成する
    challenge.challenge = b64dec(challenge.challenge);
    challenge.allowCredentials[0].id = rawId
    console.log(challenge)


    const pub = await navigator.credentials.get({publicKey: challenge})
    console.log(pub)



    // // ここで Yubikey のタッチなどが求められる
    // const {id, type, rawId, response} = await navigator.credentials.create({publicKey: publicKeyOpt})
    // console.log(response)

    // // 結果を JSON で送る
    // const {registered} = await (async () => {
    //   const body = JSON.stringify({
    //     id,
    //     type,
    //     rawId: b64enc(new Uint8Array(rawId)),
    //     response: {
    //       attestationObject: b64enc(new Uint8Array(response.attestationObject)),
    //       clientDataJSON:    b64enc(new Uint8Array(response.clientDataJSON)),
    //     }
    //   })
    //   console.log(body)
    //   const res = await fetch('credential', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: body
    //   })
    //   return res.json()
    // })()
    // console.log(registered)
    // document.querySelector('#registered').textContent = registered
  })


  const registration = await navigator.serviceWorker.register('worker.js', {type: "module"});
  await navigator.serviceWorker.ready;
})
