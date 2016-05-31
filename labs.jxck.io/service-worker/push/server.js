'use strict';
let p = console.log.bind(console);

const webPush = require('web-push');
const GCM_API_KEY = "AIzaSyAJs2U3XSP39SjeY5RhGXPqc0P2Xw_2byI";
webPush.setGCMAPIKey(GCM_API_KEY);


var op = {
  "endpoint": "https://android.googleapis.com/gcm/send/dhS0icj2JN8:APA91bEcWpgGHzqBheB1DYAn417hxdSrBi89jffMMqSDMPB22rr2AZCFQsz_DHlBYmR0LgyGHA54yaDNiOmqpsiL7DRPbclLmYIWqLDw9g0wlBvPHkj53PXuXa5bBsCLJSkzWWyyumBk",
  "key": "BGr5KL28PzvBMvCD9fqqHZ+8Hukrl1bzL4yxXwoue17ZRd1mH5+mTiEfiCjKNeozGsLCfNRGvT2TRTaDuNMK9h8=",
  "authSecret": "5EhXxO22QOC/05d3/JNWoA=="
}

var data = "yeyyy";
webPush.sendNotification(op.endpoint, {
  payload: data,
  userPublicKey: op.key,
  userAuth: op.authSecret,
})
.then(console.log.bind(console))
.catch((err) => {
  console.log(err);
});


//webPush.sendNotification(req.body.endpoint, {
//  TTL: req.body.ttl,
//  payload: req.body.payload,
//  userPublicKey: req.body.key,
//  userAuth: req.body.authSecret,
//});
