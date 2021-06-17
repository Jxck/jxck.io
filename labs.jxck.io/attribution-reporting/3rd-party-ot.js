'use strict';
document.addEventListener('DOMContentLoaded', async (e) => {
  // 3rd party ot token for https://adtech.labs.jxck.io
  const third_party_token = "AwFoh9S9Wwyz/5055uE44WSNWKPbkTWJbZe35AJTgVYf0dNGm2AXAgrfacky3S5kTcm38SxBEGbzuCR9zYywPwgAAAB2eyJvcmlnaW4iOiJodHRwczovL2FkdGVjaC5sYWJzLmp4Y2suaW86NDQzIiwiZmVhdHVyZSI6IkNvbnZlcnNpb25NZWFzdXJlbWVudCIsImV4cGlyeSI6MTYyNjIyMDc5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="
  const meta = document.createElement('meta')
  meta.httpEquiv = 'origin-trial'
  meta.content = third_party_token
  document.head.appendChild(meta)
})
