const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document);
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

const id = btoa(Math.random()*1000)
const deviceId = location.hash.replace('#', '')
const constraint = {audio:true, video: {deviceId: deviceId}}
console.log(constraint)
const rtc  = new RTC(id)

ws.on('open', () => {
  $('#call').disabled = false
  $('#call').addEventListener('click', () => {
    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    navigator.mediaDevices.getUserMedia(constraint)
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
  ws.emit('candidate', candidate)
})

rtc.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offer を作成')
  rtc.createOffer().then((rtcSessionDescription) => {
    info('4. offer を local に適用')
    return rtc.setLocalDescription(rtcSessionDescription)
  }).then(() => {
    info('4. offer を送信')
    ws.emit('offer', rtc.localDescription)
  }).catch((err) => console.error(err))
})


// rtc.on('track', (e) => {
//   log(e.track.kind)
//   if (e.track.kind === 'video') {
//     $('#remote').srcObject = e.streams[0]
//   }
// })

rtc.on('addstream', (stream) => {
  $('#remote').srcObject = stream
})

ws.on('offer', (description) => {
  info('5. offer を受信')
  rtc.setRemoteDescription(description).then((e) => {
    info('5. answer を作成')
    return rtc.createAnswer()
  }).then((rtcSessionDescription) => {
    info('6. answer を local に適用')
    return rtc.setLocalDescription(rtcSessionDescription)
  }).then(() => {
    info('6. answer を送信')
    ws.emit('answer', rtc.localDescription)
  }).catch((err) => console.error(err))
})

ws.on('answer', (description) => {
  rtc.setRemoteDescription(description)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})

ws.on('candidate', (candidate) => {
  info('7. 受信した ice candidate を適用')
  rtc
    .addIceCandidate(candidate)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})
