var https = require('https');

var AuthKey = "key=AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ";

var data = JSON.stringify({
  "registration_ids": ["c6Wbq7isMLU:APA91bFl9FiNmTiylACCZWc_DnpnbYvy-mcSqhN49kcE6AFk36Mm9nQXbf1vaFjYkZDdVRTIo0aIz4yZ2kQSbzxaQCFCKgjGwIccODcIZ37oCYbv074NsMmcF0UM5Xb973DCnbFkExJR"],
})

var options = {
  hostname: 'android.googleapis.com',
  port: 443,
  path: '/gcm/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AuthKey,
    'Content-Length': data.length
  }
};

var req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(data);
req.end();
