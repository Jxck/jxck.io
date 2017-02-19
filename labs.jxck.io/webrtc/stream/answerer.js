const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document);
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

const answerer  = new RTC('answerer')

ws.on('open', () => {
  $('#call').disabled = false
})


answerer.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('8. answwerer で上がった ice candidate を offerer に渡す')
  ws.send({type: 'candidate', candidate: candidate})
})

answerer.on('track', (e) => {
  log(e.track.kind)
  if (e.track.kind === 'video') {
    $('#remote').srcObject = e.streams[0]
  }
})

answerer.on('addstream', (stream) => {
  $('#remote').srcObject = stream
})

ws.on('message', (message) => {
  if (message.type === 'offer') {
    answerer.setRemoteDescription(message).then((e) => {
      info('5. answerer の answer を作成')
      return answerer.createAnswer()
    }).then((rtcSessionDescription) => {
      info('6. answerer の answer を適応し送信')
      log(rtcSessionDescription.type, rtcSessionDescription.sdp)
      ws.send(rtcSessionDescription)
      return answerer.setLocalDescription(rtcSessionDescription)
    })
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }

  if (message.type === 'candidate') {
    const candidate = message.candidate

    info('7. offerer で上がった ice candidate を answer に適応')
    answerer
      .addIceCandidate(candidate)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }
})
