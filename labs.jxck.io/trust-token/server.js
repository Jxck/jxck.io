const fs = require("fs");
const crypto = require("crypto");
const childProcess = require("child_process");
const util = require("util");
const exec = util.promisify(childProcess.exec);
const express = require("express");
const cbor = require("cbor");
const sfv = require("structured-field-values");
const ed25519 = require("noble-ed25519");

const { trust_token } = require("./package.json");

const app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/.well-known/trust-token/key-commitment", (req, res) => {
  console.log(req.path);
  const { ISSUER, protocol_version, batchsize, expiry, id } = trust_token;
  const srrkey = fs
    .readFileSync("./keys/srr_pub_key.txt")
    .toString()
    .trim();
  const Y = fs
    .readFileSync("./keys/pub_key.txt")
    .toString()
    .trim();

  const key_commitment = {
    id,
    protocol_version,
    batchsize,
    srrkey,
    "1": { Y, expiry }
  };

  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  });

  res.send(JSON.stringify(key_commitment, "", " "));
});

app.post(`/.well-known/trust-token/issuance`, async (req, res) => {
  console.log(req.path);
  const sec_trust_token = req.headers["sec-trust-token"];
  const result = await exec(`./bin/main --issue ${sec_trust_token}`);
  const token = result.stdout;
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  res.append("sec-trust-token", token);
  res.send();
});

app.post(`/.well-known/trust-token/redemption`, async (req, res) => {
  console.log(req.path);
  const sec_trust_token = req.headers["sec-trust-token"];
  const result = await exec(`./bin/main --redeem ${sec_trust_token}`);
  const token = result.stdout;
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  res.append("sec-trust-token", token);
  res.send();
});

app.post(`/.well-known/trust-token/send-srr`, async (req, res) => {
  console.log(req.path);

  const headers = req.headers;

  // sec-signed-redemption-record
  // [(<issuer 1>, {"redemption-record": <SRR 1>}),
  //  (<issuer N>, {"redemption-record": <SRR N>})],
  const srr = sfv.parseList(headers["sec-signed-redemption-record"]);
  const redemption_record = sfv.parseDict(
    Buffer.from(srr[0]["params"]["redemption-record"]).toString()
  );

  const { body, signature } = redemption_record;

  // verify signature
  const srr_public_key = Buffer.from(
    fs.readFileSync("./keys/srr_pub_key.txt").toString(),
    "base64"
  );
  const srr_verify = await ed25519.verify(
    signature.value,
    body.value,
    srr_public_key
  );
  console.log({ srr_verify });

  // parse SRR
  const srr_body = cbor.decodeAllSync(Buffer.from(body.value))[0];
  const metadata = srr_body["metadata"];
  const token_hash = srr_body["token-hash"];
  const client_data = srr_body["client-data"];
  const key_hash = client_data["key-hash"];
  const redeeming_origin = client_data["redeeming_origin"];
  const redeeming_timestamp = client_data["redeeming_timestamp"];
  const expiry_timestamp = srr_body["expiry-timestamp"];

  // verify client_public_key
  const sec_signature = sfv.parseDict(headers["sec-signature"]);
  const client_public_key =
    sec_signature.signatures.value[0].params["public-key"];
  const sig = sec_signature.signatures.value[0].params["sig"];

  const client_public_key_hash = crypto
    .createHash("sha256")
    .update(client_public_key)
    .digest();
  const public_key_verify =
    client_public_key_hash.toString() === key_hash.toString();
  console.log({ public_key_verify });

  // verify sec-signature
  const canonical_request_data = cbor.encode(
    new Map([
      ["sec-time", headers["sec-time"]],
      ["public-key", client_public_key],
      ["destination", "trust-token-demo.glitch.me"],
      ["sec-signed-redemption-record", headers["sec-signed-redemption-record"]],
      [
        "sec-trust-tokens-additional-signing-data",
        headers["sec-trust-tokens-additional-signing-data"]
      ]
    ])
  );

  const prefix = Buffer.from("Trust Token v0");
  const signing_data = Buffer.concat([prefix, canonical_request_data]);
  const sig_verify = await ed25519.verify(sig, signing_data, client_public_key);

  console.log(sig_verify);

  res.set({
    "Access-Control-Allow-Origin": "*"
  });

  res.send({ srr_verify, public_key_verify, sig_verify });
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${listener.address().port}`);
});

process.on("unhandledRejection", err => {
  console.error(err);
});