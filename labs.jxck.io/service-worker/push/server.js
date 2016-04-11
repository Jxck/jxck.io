'use strict';
let p = console.log.bind(console);

const webPush = require('web-push');
const GCM_API_KEY = "AIzaSyAJs2U3XSP39SjeY5RhGXPqc0P2Xw_2byI";
webPush.setGCMAPIKey(GCM_API_KEY);


var op = {
 "endpoint": "https://android.googleapis.com/gcm/send/fFmRPjwHvsU:APA91bHHSdOyt7lPHLQEPpWgQLAIcPZkWdugVoTczzKatJbkD-EpWpzfyknUjbAwgx85vIg_zpihMWff3TT7XJ0RcLu05l5Zgm9TPJ9TgVZ67E2vUXJoFwvBKwOBhxzEzHG4i-dJmZNy",
 "keys": {
  "p256dh": "BAi6I1vyQP3mGZAj13PiZqF-g96h04Ojv2U8K8xgGX2bo4-1Kl7VzbrKyqTczpjkAVZXSZAYtwxgFWuiGeqkwLM=",
  "auth": "--kaKOilQ9Q1SysX33U3jQ=="
 }
};

var op = {
  endpoint: "https://updates.push.services.mozilla.com/push/v1/gAAAAABXC3bzxzUrS0A-EJbGaYiSW8rXmDM7v4o09OHSsnuqh-sAo4cKm732NTwI2Ldt96YCzpZ42SpCX5G-l7rZ-UTJG7mOxBCsgoVKgd3TWCAChhgv1TnkqT8eSS8WqNURlVfaHCxf",
  keys: {
    p256dh: '',
    auth: '',
  }
}

var data = "yey";
webPush.sendNotification(op.endpoint, {
  payload: data,
  userPublicKey: op.keys.p256dh,
  userAuth: op.keys.auth,
})
.then(console.log.bind(console))
.catch((err) => {
  console.log(err.stack);
});
