'use strict';

let push = require('web-push');

const GCM_API_KEY = 'AIzaSyBGUlr41zf5bS_WrIKwdVD_ZXrpxLgYaSc';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
  "endpoint": "https://android.googleapis.com/gcm/send/eKTB50hStM0:APA91bEZXqUlC7zG5vhDWAn2c9MgFe-_w6VmfPh8O2kuVZP-lonvCDpyD6IarzP28SGXzzck0AbEuNTuTVGNBxU9T8wCdoHb7XT1bm4Cc76_WtG3--JBUv17WJXtPYFp_AKVNCx96LK3",
  "userAuth": "ncG9u4vNFryvN1cWRhDmFg==",
  "userPublicKey": "BOIDgb4vxrMKgrMbaIf953eZtbMHK8Dwu3ADIsjlX+dileEyY9U6E2LV6YwtxfN6rdiNkf3hnXAdLJtX92vd0xs="
}

push.sendNotification(data.endpoint, {
  payload:       'push test for service worker',
  userAuth:      data.userAuth,
  userPublicKey: data.userPublicKey,
})
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.error('fail', err);
});
