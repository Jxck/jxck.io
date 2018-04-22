'use strict';

let info = console.info.bind(console);

// TODO: make me es module if https://crbug.com/680046 fixed
// import {b64enc, b64dec} from './base64.js'
importScripts(
  './base64.js',
  'https://webauthn.bin.coffee/cbor.js'
)


self.users = {}

self.addEventListener('activate', (e) => {
  info('> activate', e);
  // e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async (e) => {
  console.log(e.request)
  const path = new URL(e.request.url).pathname;
  info('>', path);

  if (path.endsWith('/register')) {
    e.respondWith(new Promise(async (done, fail) => {
      try {
        const {username}= await e.request.json()

        const id = b64enc(new TextEncoder('utf-8').encode(username))
        const challenge = b64enc(crypto.getRandomValues(new Uint8Array(32)))

        const publicKeyOpt = {
          challenge: challenge,
          rp: {
            name: "labs.jxck.io"
          },
          user: {
            id: id,
            name: username,
            displayName: username
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 } // "ES256" IANA COSE Algorithms registry
          ],
          attestation: 'direct',
          timeout: 3000, // short for debugging
        }

        const header = {
          headers: { 'Content-Type': 'application/json' }
        }
        done(new Response(JSON.stringify(publicKeyOpt), header));
      } catch (err) {
        fail(err)
      }
    }))
  } else if (path.endsWith('/credential')) {
    e.respondWith(new Promise(async (done, fail) => {
      try {
        const json = await e.request.json()
        console.log(json)
        const {id, type, rawId, response} = json

        const clientData = JSON.parse(new TextDecoder('utf-8').decode(b64dec(response.clientDataJSON)))
        console.log(clientData)

        const {fmt, attStmt, authData} = CBOR.decode(b64dec(response.attestationObject).buffer)
        console.log(fmt, attStmt, authData)

        console.assert(fmt, 'fido-u2f')

        const rpidHash  = authData.slice( 0, 32)
        const flags     = authData.slice(32, 33)
        const signCount = authData.slice(33, 37)

        console.log("rpidHash",  rpidHash)
        console.log("flags",     flags)
        console.log("signCount", signCount)

        // flag = [ED, AT, 0, 0, 0, UV, 0, UP] https://w3c.github.io/webauthn/#flags
        const UP = (flags & (2**0)) >> 0 // UserPresent
        const UV = (flags & (2**2)) >> 2 // UserVerified
        const AT = (flags & (2**6)) >> 6 // AttestedCredentialData
        const ED = (flags & (2**7)) >> 7 // Extension data included

        console.log(UP, UV, AT, ED)

        if (AT) {
          const aaguid              = authData.slice(37, 53);
          const credentialIdLength  = (authData[53] << 8) + authData[54];
          const credentialId        = authData.slice(55, 55 + credentialIdLength);
          const credentialPublicKey = CBOR.decode(authData.slice(55 + credentialIdLength).buffer);

          console.log({
            aaguid,
            credentialIdLength,
            credentialId,
            credentialPublicKey
          })

          const kty = credentialPublicKey[1]
          const alg = credentialPublicKey[3]
          const crv = credentialPublicKey[-1]
          const x   = credentialPublicKey[-2]
          const y   = credentialPublicKey[-3]

          console.log({
            kty,
            alg,
            crv,
            x,
            y
          })

          // [0x40, xcoord, ycoord] https://w3c.github.io/webauthn/#fido-u2f-attestation
          const publickKeyU2F = new Uint8Array(1 + x.length + y.length)
          publickKeyU2F[0] = 0x04
          publickKeyU2F.set(x, 1)
          publickKeyU2F.set(y, 1+x.length)

          const b64 = b64enc(publickKeyU2F, {urlsafe:true})
          console.log(b64)

          const jwk = {
            kty: "EC",
            crv: "P-256",
            x:   b64enc(x, {urlsafe:true}),
            y:   b64enc(y, {urlsafe:true})
          }
          const cryptoKey = await crypto.subtle.importKey("jwk", jwk, {name: "ECDSA", namedCurve: "P-256"}, true, ["verify"])
          console.log(cryptoKey)

          // Check RP ID Hash Validation
          const digest = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode("labs.jxck.io"))
          console.log("rpidHash",  rpidHash)
          console.log("digest  ", new Uint8Array(digest))
        }






        const aaa = {
          attestation: 'direct',
          timeout: 3000,
        }

        const header = {
          headers: { 'Content-Type': 'application/json' }
        }
        done(new Response(JSON.stringify(aaa), header));
      } catch (err) {
        fail(err)
      }
    }))
  }
  return;
});
