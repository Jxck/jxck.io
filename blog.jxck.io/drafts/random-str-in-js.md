# ブラウザで適当なランダム文字列

## Intro

テストや仮実装で便利

```js
// with random
btoa(Math.random())
// => MC44NzEwODQwMjA1NDA2MTE4

// with crypto
btoa(crypto.getRandomValues(new Uint8Array(16)))
// => MjQ2LDE0NSwxNzAsMjQ0LDY4LDg3LDMzLDE0NiwxNzcsNjAsMTUyLDE3MSwxNTAsMTcsMTA4LDEwNA==

// base64 has `=` remove them
btoa(Math.random()).replace(/=/g, "")
// => MC45NTM0NTM2OTY3MTc5MDY0

// lower case
btoa(Math.random()).toLowerCase()
// => mc43ndy1odizmjg5ndq4otm0

// align length
btoa(Math.random()).substring(0, 10)
// => MC42NjgwND

// letter only
btoa(crypto.getRandomValues(new Uint8Array(16))).replace(/[0-9]/g, '').replace(/=/g, "")
// => MTELDMLDksMTMwLDEMywxMzgsNzUsMjQzLDENCwyMDcsMjALDIMiwxNDEsMjILDYLDIMg

// number only
crypto.getRandomValues(new Uint8Array(16)).join('')
// => 24066186112482432389420313011522520523361145
```

[DEMO](https://labs.jxck.io/ecmascript/random.html)
