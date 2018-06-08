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
const constraint = {video:true}

document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
const connection = new RTCPeerConnection(Config)

function log(name, value) {
  const $log = document.querySelector('#log')
  $log.value += `[${name}]\n${value}\n\n`
}

connection.addEventListener('negotiationneeded', async (e) => {
  console.log('******************* onnegotiationneeded *******************', e)

  // chrome fires onnegotiationneeded in answere side
  if (connection.signalingState === 'have-remote-offer') return

  // create offer
  const offer = await connection.createOffer()
  log('offer', offer.sdp)
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
  log('candidate', JSON.stringify(candidate))
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

connection.addEventListener('track', ({streams}) => {
  console.log('====================== ontrack ========================', streams)
  const $video = document.createElement('video')
  $video.srcObject = streams[0]
  $video.play()
  document.querySelector('#videos').appendChild($video)
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

    log('offer', message.data.sdp)
    await connection.setRemoteDescription(message.data)

    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    document.querySelector('#local').srcObject = stream

    console.log('addTrack')
    stream.getTracks().forEach((track) => {
      connection.addTrack(track, stream)
    })

    await connection.setLocalDescription(await connection.createAnswer())
    console.log(connection.localDescription.sdp)

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
    log('answer', message.data.sdp)
    await connection.setRemoteDescription(message.data)
  }

  if (type === 'candidate') {
    log('candidate', JSON.stringify(message.data))
    await connection.addIceCandidate(message.data)
  }
})
