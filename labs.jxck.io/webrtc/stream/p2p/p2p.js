'use strict'

window.peerid = ''
window.role = ''

const id = btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase()
const constraint = {video:true}

document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
const connection = new RTCPeerConnection()

connection.onnegotiationneeded = async (e) => {
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
  document.querySelector('#remote').srcObject = streams[0]
}

connection.onaddstream = ({stream}) => {
  document.querySelector('#remote').srcObject = stream
}


document.querySelector('#start').onsubmit = async (e) => {
  e.preventDefault()

  window.role = 'offerer'
  window.peerid = document.querySelector('#peer').value
  if (window.peerid === '') return alert('input peerid')

  const stream = await navigator.mediaDevices.getUserMedia(constraint)
  document.querySelector('#local').srcObject = stream

  if (connection.addTrack) {
    stream.getTracks().forEach((track) => {
      connection.addTrack(track, stream)
    })
  } else {
    connection.addStream(stream)
  }
}

ws.onmessage = async ({data}) => {
  const {type, message} = JSON.parse(data)
  if (message.to !== id) return

  if (type == 'offer') {
    window.peerid = message.from
    window.role = 'answerer'

    // 他の非同期処理を待つことなく、すぐに適用する
    await connection.setRemoteDescription(message.data)

    // sRD してから非同期処理
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    document.querySelector('#local').srcObject = stream

    if (connection.addTrack) {
      stream.getTracks().forEach((track) => {
        connection.addTrack(track, stream)
      })
    } else {
      connection.addStream(stream)
    }
  }

  if (type == 'answer') {
    await connection.setRemoteDescription(message.data)
  }

  if (type == 'candidate') {
    await connection.addIceCandidate(message.data)
  }
}
