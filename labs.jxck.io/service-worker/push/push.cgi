#!/home/jxck/dotfiles/pkg/nodebrew/current/bin/node

const webpush   = require('web-push')
const vapidKeys = require('./vapid-keys.json')
const contact   = 'mailto:admin@jxck.io'
webpush.setVapidDetails(contact, vapidKeys.publicKey, vapidKeys.privateKey)

const content_length = process.env['CONTENT_LENGTH']
process.stdin.setEncoding('utf-8')
process.stdin.on('readable', async (e) => {
  try {
    const req = process.stdin.read(content_length)
    if (req === null)  return

    // console.error('req', JSON.parse(req));

    const {sub, title, options} = JSON.parse(req)

    const payload = JSON.stringify({ title, options })

    const response = await webpush.sendNotification(sub, payload)
    // console.error('response', response)

    console.log('Content-type: text/plain');
    console.log('');
    console.log(req)
  } catch (err) {
    console.error('error', err)
  }
})
