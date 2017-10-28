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

const rand = () => btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase();
const id = location.hash ? location.hash : rand()
const constraint = {video:true}

document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
const connection = new RTCPeerConnection(Config)

connection.onnegotiationneeded = async (e) => {
  console.log('******************* onnegotiationneeded *******************', e)

  // chrome fires onnegotiationneeded in answere side
  if (connection.signalingState === 'have-remote-offer') return

  // create offer
  const offer = await connection.createOffer()
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
}

connection.onicecandidate = ({candidate}) => {
  console.log('candidate', candidate)
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
}

connection.ontrack = ({streams}) => {
  console.log('ontrack', streams)
  document.querySelector('#remote').srcObject = streams[0]
}

connection.onaddstream = ({stream}) => {
  console.log('onaddstream', stream)
  document.querySelector('#remote').srcObject = stream
}

connection.onicecandidateerror = (e) => {
  console.error(e.type, e)
}

connection.onsignalingstatechange = (e) => {
  console.log(e.type, connection.signalingState)
}

connection.oniceconnectionstatechange = (e) => {
  console.log(e.type, connection.iceConnectionState)
}

connection.onicegatheringstatechange = (e) => {
  console.log(e.type, connection.signalingState)
}

connection.onconnectionstatechange = (e) => {
  console.log(e.type, connection.connectionState)
}

document.querySelector('#start').onsubmit = async (e) => {
  e.preventDefault()
  console.log('start')

  window.peerid = document.querySelector('#peer').value
  if (window.peerid === '') return alert('input peerid')

  const stream = await navigator.mediaDevices.getUserMedia(constraint)
  document.querySelector('#local').srcObject = stream

  if (connection.addTrack) {
    console.log('addTrack')
    stream.getTracks().forEach((track) => {
      connection.addTrack(track, stream)
    })
  } else {
    console.log('addStream')
    connection.addStream(stream)
  }
}

ws.onmessage = async ({data}) => {
  console.log('>>>>>>>>>>>>', data)
  try {
    const {type, message} = JSON.parse(data)
    if (message.to !== id) return
    console.log(type, message)

    if (type == 'offer') {
      window.peerid = message.from

      await connection.setRemoteDescription(message.data)

      const stream = await navigator.mediaDevices.getUserMedia(constraint)
      document.querySelector('#local').srcObject = stream

      if (connection.addTrack) {
        console.log('addTrack')
        stream.getTracks().forEach((track) => {
          connection.addTrack(track, stream)
        })
      } else {
        console.log('addStream')
        connection.addStream(stream)
      }

      await connection.setLocalDescription(await connection.createAnswer())

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

    if (type == 'answer') {
      await connection.setRemoteDescription(message.data)
    }

    if (type == 'candidate') {
      await connection.addIceCandidate(message.data)
    }
  } catch (err) {
    console.error(err)
  }
}
