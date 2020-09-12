const fs = require("fs");
const childProcess = require("child_process");
const util = require("util");
const exec = util.promisify(childProcess.exec);
const express = require("express");
const app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/.well-known/trust-token/key-commitment", (req, res) => {
  console.log(req.path);
  const { trust_token } = require("./package.json");
  const { ISSUER, protocol_version, batchsize, expiry } = trust_token;
  const srrkey = fs
    .readFileSync("./keys/srr_pub_key.txt")
    .toString()
    .trim();
  const Y = fs
    .readFileSync("./keys/pub_key.txt")
    .toString()
    .trim();

  const COMMITMENT = {};
  COMMITMENT[ISSUER] = {
    protocol_version,
    batchsize,
    srrkey,
    "1": { Y, expiry }
  };

  res.json({
    ISSUER,
    COMMITMENT
  });
});

app.post(`/.well-known/trust-token/issuance`, async (req, res) => {
  console.log(req.path);
  const sec_trust_token = req.headers["sec-trust-token"];
  const result = await exec(`./bin/main --issue ${sec_trust_token}`);
  const token = result.stdout;
  res.append("sec-trust-token", token);
  res.send();
});

app.post(`/.well-known/trust-token/redemption`, async (req, res) => {
  console.log(req.path);
  const sec_trust_token = req.headers["sec-trust-token"];
  const result = await exec(`./bin/main --redeem ${sec_trust_token}`);
  const token = result.stdout;
  res.append("sec-trust-token", token);
  res.send();
});

app.post(`/.well-known/trust-token/send-srr`, async (req, res) => {
  console.log(req.path);
  const sec_signed_redemption_record =
    req.headers["sec-signed-redemption-record"];
  res.send(sec_signed_redemption_record);
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${listener.address().port}`);
});
