'use strict'

// Signaling Protocol
// ws.send(JSON.stringify({
//   id:   'peerid',
//   type: 'offer/answer',
//   message: {
//     from: 'myid',
//     to:   'peerid',
//     data: 'message'
//   }
// }))

window.peerid = ''

const rand = () => btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase()
const id = location.hash ? location.hash : rand()
const constraint = {video:true, audio:false}

document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
console.log(Config)
const connection = new RTCPeerConnection(Config)

const $log = document.querySelector('#log')
const log = console.log.bind(console)
// function log(name, value) {
//   $log.value += `[${name}]\n${value}\n\n`
// }


connection.addEventListener('negotiationneeded', async (e) => {
  console.log('******************* onnegotiationneeded *******************', e)

  // chrome fires onnegotiationneeded in answere side
  if (connection.signalingState === 'have-remote-offer') return

  // create offer
  const offer = await connection.createOffer()

  log('send offer', offer.sdp)
  await connection.setLocalDescription(offer)

  ws.send(JSON.stringify({
    id:   window.peerid,
    type: 'offer',
    message: {
      from: id,
      to:   peerid,
      data: offer
    }
  }))
})

connection.addEventListener('icecandidate', ({candidate}) => {
  log('send candidate', JSON.stringify(candidate))
  if (candidate === null) return

  ws.send(JSON.stringify({
    id:   window.peerid,
    type: 'candidate',
    message: {
      from: id,
      to:   window.peerid,
      data: candidate
    }
  }))
})

connection.addEventListener('track', (e) => {
  console.log('====================== ontrack ========================', e)
  const $video = document.querySelector('#remote')
  if ($video.srcObject) {
    $video.srcObject.addTrack(e.track)
  } else {
    $video.srcObject = e.streams[0]
  }
})

connection.addEventListener('icecandidateerror', (e) => {
  console.error(e.type, e)
})

connection.addEventListener('signalingstatechange', (e) => {
  console.log(e.type, connection.signalingState)
})

connection.addEventListener('iceconnectionstatechange', (e) => {
  console.log(e.type, connection.iceConnectionState)
})

connection.addEventListener('icegatheringstatechange', (e) => {
  console.log(e.type, connection.signalingState)
})

connection.addEventListener('connectionstatechange', (e) => {
  console.log(e.type, connection.connectionState)
})

document.querySelector('#start').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('start')

  window.peerid = document.querySelector('#peer').value
  if (window.peerid === '') return alert('input peerid')

  const checked = document.querySelector('input[name="deviceid"]:checked')
  if (checked) {
    const deviceId = checked.id
    constraint.video = {deviceId}
  }
  const stream = await navigator.mediaDevices.getUserMedia(constraint)
  document.querySelector('#local').srcObject = stream

  console.log('addTrack')
  stream.getTracks().forEach((track) => {
    connection.addTrack(track, stream)
  })
})

ws.addEventListener('message', async ({data}) => {
  console.log('>>>>>>>>>>>>', data)
  const {type, message} = JSON.parse(data)
  if (message.to !== id) return
  console.log(type, message)

  if (type === 'offer') {
    window.peerid = message.from

    log('recv offer', message.data.sdp)
    await connection.setRemoteDescription(message.data)

    const checked = document.querySelector('input[name="deviceid"]:checked')
    if (checked) {
      const deviceId = checked.id
      constraint.video = {deviceId}
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    document.querySelector('#local').srcObject = stream

    console.log('addTrack')
    stream.getTracks().forEach((track) => {
      connection.addTrack(track, stream)
    })

    const answer = await connection.createAnswer()
    await connection.setLocalDescription(answer)
    log('send answer', connection.localDescription.sdp)

    ws.send(JSON.stringify({
      id:   window.peerid,
      type: 'answer',
      message: {
        from: id,
        to:   window.peerid,
        data: connection.localDescription
      }
    }))
  }

  if (type === 'answer') {
    log('recv answer', message.data.sdp)
    await connection.setRemoteDescription(message.data)
  }

  if (type === 'candidate') {
    log('recv candidate', JSON.stringify(message.data))
    await connection.addIceCandidate(message.data)
  }
})

const $stats = document.querySelector('#stats')
$stats.addEventListener('click', async () => {
  connection.getSenders().forEach(async (sender) => {
    const stats = await sender.getStats()
    console.log(stats)
    console.table(stats)
  })
  connection.getReceivers().forEach(async (receiver) => {
    const stats = await receiver.getStats()
    console.log(stats)
    console.table(stats)
  })
});


// device id
(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log(devices)
  devices.filter((d) => {
    return (d.kind === 'videoinput')
  }).forEach((d) => {
    const id = d.deviceId
    const label = d.label
    console.log(id, label)

    const $li = document.createElement('li')

    const $radio = document.createElement('input')
    $radio.id = id
    $radio.type = "radio"
    $radio.name = "deviceid"

    const $label = document.createElement('label')
    $label.htmlFor = id
    $label.textContent = label

    $li.appendChild($radio)
    $li.appendChild($label)

    document.querySelector('#devices').appendChild($li)
  })
})()
