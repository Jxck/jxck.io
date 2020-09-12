# Trust Token DEMO

DEMO of Trust Token API based on boringssl.

https://trust-token-demo.glitch.me/

## How to use

1. open Google Chrome Canary &gt; M87 with flag shown in page
2. click Yes button for "Are you a human"
3. you can see Redemption Record in page

## How to build

### boringssl

this demo requires boringssl, kick `./install-boringssl.sh` for download/build.

```sh
$ ./install-boringssl.sh
```

### build c command

build [c](./c) command with boringssl.

```sh
$ make
```

### up http server

run http demo with express

```sh
$ npm install
$ npm start
```

note: you need origin trials token.

## API

### Key Commitment

```
GET /.well-known/trust-token/key-commitment
```

key-commitments in JSON format for browser.

### Issue Request

```
POST /.well-known/trust-token/request
```

Trust Token Issue request endpoint

### Redemption

```
POST /.well-known/trust-token/redemption
```

SRR Token Redemption request endpoint

### Send SRR

```
POST /.well-known/trust-token/send-srr
```

Send SRR endpoint, which echo back Sec-Signed-Redemtption-Record header which client sends as response.


## Command

[bin/main](./bin/main) is build result of [c/main.c](c/main.c).

this command has flag for trust token operation.

```sh
$ main --issue $REQUEST
$ main --redeem $REQUEST
$ main --key-generate
```

### --issue

take issueance request (Sec-Trust-Token HTTP Header) and return a issuance response.

### --redeem

take redemption request (Sec-Trust-Token HTTP Header) and return a redemption response.

### --key-generate

generate, Priv/Pub key for trust-token and ED25519 keypair.
save them into each files in [./keys](./keys) dir.
