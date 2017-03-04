const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document);
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

const id = btoa(Math.random()*1000)

const rtc  = new RTC(id)

ws.on('open', () => {
  $('#call').disabled = false
  $('#call').addEventListener('click', () => {
    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then((stream) => {
        info('1. addTrack()')
        rtc.addStream(stream)
        // TODO: fixme with addTrack if chrome supports
        //stream.getTracks().forEach((track) => {
        //  rtc.addTrack(track, stream)
        //})
        // ここで negotiation needed が発火する
        $('#local').srcObject = stream
      })
  })
})

rtc.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. ice candidate を送信')
  ws.send({type: 'candidate', candidate: candidate})
})

rtc.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offer を作成')
  rtc.createOffer().then((rtcSessionDescription) => {
    info('4. offer を local に適用')
    log(rtcSessionDescription.type, rtcSessionDescription.sdp)
    return rtc.setLocalDescription(rtcSessionDescription)
  }).then(() => {
    info('4. offer を送信')
    ws.send(rtc.localDescription)
  }).catch((err) => console.error(err))
})


// rtc.on('track', (e) => {
//   log(e.track.kind)
//   if (e.track.kind === 'video') {
//     $('#remote').srcObject = e.streams[0]
//   }
// })

rtc.on('addstream', (stream) => {
  console.error(stream);
  $('#remote').srcObject = stream
})

ws.on('message', (message) => {
  if (message.type === 'offer') {
    info('5. offer を受信')
    rtc.setRemoteDescription(message).then((e) => {
      info('5. answer を作成')
      return rtc.createAnswer()
    }).then((rtcSessionDescription) => {
      info('6. answer を local に適用')
      log(rtcSessionDescription.type, rtcSessionDescription.sdp)
      return rtc.setLocalDescription(rtcSessionDescription)
    }).then(() => {
      info('6. answer を送信')
      ws.send(rtc.localDescription)
    }).catch((err) => console.error(err))
  }

  if (message.type === 'answer') {
    rtc.setRemoteDescription(message)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }

  if (message.type === 'candidate') {
    const candidate = message.candidate

    info('7. 受信した ice candidate を適用')
    rtc
      .addIceCandidate(candidate)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }
})
