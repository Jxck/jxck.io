'use strict';

let push = require('web-push');

const GCM_API_KEY = '*******';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
  "endpoint": "********",
  "userAuth": "********",
  "userPublicKey": "******"
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
