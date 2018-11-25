'use strict'

const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

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
const [LEFT, RIGHT] = [-1, 1]


const files = [
  {file: "female1.wav", desc: "彼は鮎を釣る名人です    "},
  {file: "female2.wav", desc: "読書の楽しさを          "},
  {file: "female3.wav", desc: "人々の屏風絵と如来像    "},
  {file: "male1.wav"  , desc: "彼女を説得しようとしても"},
  {file: "male2.wav"  , desc: "近頃の子どもたちは      "},
  {file: "male3.wav"  , desc: "彼は以前から科学技術の  "},
]
const FILE = files[(~~(Math.random()*files.length))]


$('#id').textContent = id
$('#peer').value = ''

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])

console.log(JSON.stringify(Config, ' ', ' '))

const connection = new RTCPeerConnection(Config)

connection.on('negotiationneeded', async (e) => {
  console.log('=================== onnegotiationneeded ===================', connection.signalingState, e)

  // chrome fires onnegotiationneeded in answere side
  if (connection.signalingState === 'have-remote-offer') return

  // create offer
  const offer = await connection.createOffer()

  console.log('send offer', offer.sdp)
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

connection.on('icecandidate', ({candidate}) => {
  console.log('send candidate', JSON.stringify(candidate, ' ', ' '))
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

connection.on('track', (e) => {
  console.log('====================== ontrack ========================', e)
  const $video = $('#remote')
  if ($video.srcObject) {
    $video.srcObject.addTrack(e.track)
  } else {
    $video.srcObject = e.streams[0]
  }
})

connection.on('icecandidateerror', (e) => {
  console.error(e.type, e)
})

connection.on('signalingstatechange', (e) => {
  console.debug(e.type, connection.signalingState)
})

connection.on('iceconnectionstatechange', (e) => {
  console.debug(e.type, connection.iceConnectionState)
})

connection.on('icegatheringstatechange', (e) => {
  console.debug(e.type, connection.signalingState)
})

connection.on('connectionstatechange', (e) => {
  console.debug(e.type, connection.connectionState)
})

async function getStream(constraint) {
  if (constraint.video.deviceId === "dummy") {

    const color = `rgb(${~~(Math.random()*255)}, ${~~(Math.random()*255)}, ${~~(Math.random()*255)})`
    async function canvasStream() {
      const $canvas = document.createElement('canvas')

      // format to hh:mm:ss:ms
      function format(n) {
        let hh = ((~~(n/(60*60*1000)))%24).toString().padStart(2,0)
        let mm = ((~~(n/   (60*1000)))%60).toString().padStart(2,0)
        let ss = ((~~(n/       1000)) %60).toString().padStart(2,0)
        let ms = (    n             %1000).toString().padStart(3,0)

        return `${hh}:${mm}:${ss}:${ms}`
      }

      // canvas
      const ctx = $canvas.getContext('2d')
      ctx.font = "45px monospace"

      // Timer
      let n = 0
      setInterval(() => {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, 300, 150);

        // calculate and update time
        ctx.fillStyle = color
        ctx.fillText(format(n+=10), 15, 90);

        // sound(n)
      }, 10)

      return $canvas.captureStream(60)
    }

    async function audioStream(file, pan) {
      const url = `https://labs.jxck.io/assets/Japanese/${file}`

      const context = new AudioContext()
      const source = context.createBufferSource()
      const panner = context.createStereoPanner()
      const destination = context.createMediaStreamDestination()

      const res = await fetch(url)
      const buf = await res.arrayBuffer()
      //debugger
      panner.panningModel = "equalpower"
      panner.pan.value = pan

      context.decodeAudioData(buf, (decoded) => {
        source.buffer = decoded
        source.loop = true
        source.connect(panner)
        panner.connect(destination)
        source.start(0)
      })

      return destination.stream
    }

    const mediaStream = new MediaStream([
      ...(await canvasStream()).getTracks(),

      // 音声を一緒に贈ろうとすると onnegotiationneeded が二回発火する
      // ブラウザの組み合わせによって微妙によくわからない挙動をするのでペンディング
      //...(await audioStream(constraint.file, constraint.pan)).getTracks()
    ])

    return mediaStream
  } else {
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    return stream
  }
}

$('#start').on('submit', async (e) => {
  e.preventDefault()
  console.log('start')

  window.peerid = $('#peer').value
  if (window.peerid === '') return alert('input peerid')

  const checked = $('input[name="deviceid"]:checked')
  if (checked) {
    const deviceId = checked.id
    constraint.video = {deviceId}
  }

  constraint.pan = LEFT
  constraint.file = FILE.file
  const stream = await getStream(constraint)
  $('#local').srcObject = stream

  console.log('addTrack')
  stream.getTracks().forEach((track) => {
    connection.addTrack(track, stream)
  })
})

ws.on('message', async ({data}) => {
  console.debug('recv data', data)
  const {type, message} = JSON.parse(data)
  if (message.to !== id) return
  console.log(type, message)

  if (type === 'offer') {
    window.peerid = message.from

    console.log('recv offer', message.data.sdp)
    await connection.setRemoteDescription(message.data)

    const checked = $('input[name="deviceid"]:checked')
    if (checked) {
      const deviceId = checked.id
      constraint.video = {deviceId}
    }
    constraint.pan = RIGHT
    constraint.file = FILE.file
    const stream = await getStream(constraint)
    $('#local').srcObject = stream

    stream.getTracks().forEach((track) => {
      console.debug('addTrack')
      connection.addTrack(track, stream)
    })

    const answer = await connection.createAnswer()
    await connection.setLocalDescription(answer)
    console.log('send answer', connection.localDescription.sdp)

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
    console.log('recv answer', message.data.sdp)
    await connection.setRemoteDescription(message.data)
  }

  if (type === 'candidate') {
    console.log('recv candidate', JSON.stringify(message.data, ' ', ' '))
    await connection.addIceCandidate(message.data)
  }
})

const $stats = $('#stats')
$stats.on('click', async () => {
  connection.getSenders().forEach(async (sender) => {
    const stats = await sender.getStats()
    console.table(stats)
  })
  connection.getReceivers().forEach(async (receiver) => {
    const stats = await receiver.getStats()
    console.table(stats)
  })
});


// device id
(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  devices.push({deviceId: "dummy", label: `dummy (${FILE.desc}...)`, kind: "videoinput"})
  console.debug(devices)
  devices.filter((d) => {
    return (d.kind === 'videoinput')
  }).forEach((d) => {
    const id = d.deviceId
    const label = d.label
    console.debug(id, label)

    const $li = document.createElement('li')

    const $radio = document.createElement('input')
    $radio.id    = id
    $radio.type  = "radio"
    $radio.name  = "deviceid"

    if(id === 'dummy') $radio.checked = true

    const $label       = document.createElement('label')
    $label.htmlFor     = id
    $label.textContent = label

    $li.appendChild($radio)
    $li.appendChild($label)

    $('#devices').appendChild($li)
  })
})()
