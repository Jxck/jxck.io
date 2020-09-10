'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

function base64decode(str) {
  return new Uint8Array([...atob(str)].map((a) => a.charCodeAt(0)))
}

document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  const {ISSUER, COMMITMENT} = await (await fetch('/.well-known/trust-token/key-commitment')).json()

  // display chrome flag with key-commitment
  const CMD = `/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary \\
  --additional-trust-token-key-commitments='${JSON.stringify(COMMITMENT)}' \\
  --auto-open-devtools-for-tabs \\
  --v=1 \\
  https://issuer.example \\
  > canary_debuglog.txt 2>&1
  `

  $('#flag').textContent = CMD;

  $('#yes').on('click', async () => {
    const res = await fetch(`/.well-known/trust-token/request`, {
      method: 'POST',
      trustToken: {
        type: 'token-request',
        issuer: ISSUER,
      }
    })

    console.log(res)

    const token = await document.hasTrustToken(ISSUER)
    console.log(token)

    const res2 = await fetch(`/.well-known/trust-token/redemption`, {
      method: 'POST',
      trustToken: {
        type: 'srr-token-redemption',
        issuer: ISSUER,
        refreshPolicy: 'refresh'
      }
    })
    console.log(res2)

    const res3 = await fetch(`/.well-known/trust-token/send-srr`, {
      method: 'POST',
      trustToken: {
        type: 'send-srr',
        issuer: ISSUER,
        issuers: [ISSUER],
      }
    });
    const body = await res3.text()
    console.log(body)

    // TODO: structured-header decode
    const base64 = (atob(body.match(/redemption-record=:(.*):/)[1]).split(",")[0].match(/body=:(.*):/)[1])
    const bytes  = base64decode(base64)
    const result = CBOR.decode(bytes.buffer)

    $("#result").textContent = JSON.stringify(result, ' ',  ' ')
  })
})
