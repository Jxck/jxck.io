'use strict'

window.peerid = ''
window.role = ''

const id = btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase()
const constraint = {video:true}

document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
const connection = new RTCPeerConnection(Config)

connection.onnegotiationneeded = async (e) => {
  console.log('onnegotiationneeded', window.role)
  if (window.role === 'offerer') {
    await connection.setLocalDescription(await connection.createOffer())
    ws.send(JSON.stringify({
      id: window.peerid,
      type: 'offer',
      message: {
        from: id,
        to: window.peerid,
        data: connection.localDescription
      }
    }))
  }
  if (window.role === 'answerer') {
    await connection.setLocalDescription(await connection.createAnswer())
    ws.send(JSON.stringify({
      id: window.peerid,
      type: 'answer',
      message: {
        from: id,
        to: window.peerid,
        data: connection.localDescription
      }
    }))
  }
}

connection.onicecandidate = ({candidate}) => {
  console.log('candidate', candidate)
  if (candidate === null) return

  ws.send(JSON.stringify({
    id: window.peerid,
    type: 'candidate',
    message: {
      from: id,
      to: window.peerid,
      data: candidate
    }
  }))
}

connection.ontrack = ({streams}) => {
  console.log('ontrack')
  document.querySelector('#remote').srcObject = streams[0]
}

connection.onaddstream = ({stream}) => {
  console.log('onaddstream')
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

  window.role = 'offerer'
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
  try {
    const {type, message} = JSON.parse(data)
    if (message.to !== id) return

    console.log(type, message)

    if (type == 'offer') {
      window.peerid = message.from
      window.role = 'answerer'

      // 他の非同期処理を待つことなく、すぐに適用する
      await connection.setRemoteDescription(message.data)

      // sRD してから非同期処理
      const stream = await navigator.mediaDevices.getUserMedia(constraint)
      console.log(stream)
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
