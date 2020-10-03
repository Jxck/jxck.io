"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
EventTarget.prototype.on = EventTarget.prototype.addEventListener;

function base64decode(str) {
  return new Uint8Array([...atob(str)].map(a => a.charCodeAt(0)));
}

document.on("DOMContentLoaded", async e => {
  console.log(e);

  const ISSUER = location.origin;

  const COMMITMENT = await (await fetch(
    "/.well-known/trust-token/key-commitment"
  )).json();
    

  // display chrome flag with key-commitment
  const CMD = `/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary \\
  --additional-trust-token-key-commitments='{"${ISSUER}": ${JSON.stringify(COMMITMENT)}}' \\
  --auto-open-devtools-for-tabs \\
  --v=1 \\
  ${location.href} \\
  1> /dev/null \\
  2> /dev/null
  `;

  $("#flag").textContent = CMD;

  $("#yes").on("click", async () => {
    // issuer request
    await fetch(`/.well-known/trust-token/issuance`, {
      method: "POST",
      trustToken: {
        type: "token-request",
        issuer: ISSUER
      }
    });

    // check token exists
    const token = await document.hasTrustToken(ISSUER);
    console.log(token);

    // redemption request
    await fetch(`/.well-known/trust-token/redemption`, {
      method: "POST",
      trustToken: {
        type: "srr-token-redemption",
        issuer: ISSUER,
        refreshPolicy: "refresh"
      }
    });

    // send SRR and echo Sec-Signed-Eedemption-Record
    const res = await fetch(`/.well-known/trust-token/send-srr`, {
      headers: new Headers({
        "Signed-Headers": "sec-signed-redemption-record, sec-time"
      }),

      method: "POST",
      trustToken: {
        type: "send-srr",
        issuer: ISSUER, // deprecated
        issuers: [ISSUER],
        includeTimestampHeader: true,
        signRequestData: "include",
        additionalSigningData: "additional_signing_data"
      }
    });

    const body = await res.json();
    $("#result").textContent = Object.entries(body)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  });
});
