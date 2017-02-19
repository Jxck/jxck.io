const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document);
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

const offerer = new RTC('offerer')

ws.on('open', () => {
  $('#call').disabled = false
  $('#call').addEventListener('click', () => {
    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then((stream) => {
        info('1. addTrack()')
        offerer.addStream(stream)
        // TODO: fixme with addTrack if chrome supports
        //stream.getTracks().forEach((track) => {
        //  offerer.addTrack(track, stream)
        //})
        // ここで negotiation needed が発火する
        $('#local').srcObject = stream
      })
  })
})

offerer.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. offerer で上がった ice candidate を remote に渡す')
  ws.send({type: 'candidate', candidate: candidate})
})

offerer.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offerer の offer を作成')
  offerer.createOffer().then((rtcSessionDescription) => {
    info('4. offerer の offer を適応し送信')
    log(rtcSessionDescription.type, rtcSessionDescription.sdp)
    return offerer.setLocalDescription(rtcSessionDescription)
  }).then(() => {
    ws.send(offerer.localDescription)
  }).catch((err) => console.error(err))
})

offerer.on('addstream', (stream) => {
  $('#remote').srcObject = stream
})

ws.on('message', (message) => {
  if (message.type === 'offer') {
    offerer.setRemoteDescription(message).then((e) => {
      info('5. offerer の answer を作成')
      return offerer.createAnswer()
    }).then((rtcSessionDescription) => {
      info('6. offerer の answer を local に適応')
      log(rtcSessionDescription.type, rtcSessionDescription.sdp)
      return offerer.setLocalDescription(rtcSessionDescription)
    }).then(() => {
      info('6. offerer の answer を送信')
      ws.send(offerer.localDescription)
    }).catch((err) => console.error(err))
  }

  if (message.type === 'answer') {
    offerer.setRemoteDescription(message)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }

  if (message.type === 'candidate') {
    const candidate = message.candidate

    info('7. answer で上がった ice candidate を offerer に適応')
    offerer
      .addIceCandidate(candidate)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }
})
