'use strict'

window.peerid = '';
window.role = '';

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

connection.onicecandidate = (e) => {
  const candidate = e.candidate
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

connection.ontrack = (e) => {
  document.querySelector('#remote').srcObject = e.streams[0]
}

connection.onaddstream = (e) => {
  document.querySelector('#remote').srcObject = e.stream
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

ws.onmessage = async (e) => {
  const data = JSON.parse(e.data)
  if (data.message.to !== id) return;

  if (data.type == 'offer') {
    window.peerid = data.message.from
    window.role = 'answerer'

    // 他の非同期処理を待つことなく、すぐに適用する
    await connection.setRemoteDescription(data.message.data)

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

  if (data.type == 'answer') {
    await connection.setRemoteDescription(data.message.data)
  }

  if (data.type == 'candidate') {
    await connection.addIceCandidate(data.message.data)
  }
}
