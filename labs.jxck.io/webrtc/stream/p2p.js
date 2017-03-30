const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document)
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])

const id = btoa(Math.random()*1000)
const constraint = {audio:true, video: true}

const url = new URL(location.href)
const turn = url.searchParams.get('turn') === 'true'
const rtc  = new RTC(id, turn ? Config : undefined)

ws.on('open', () => {
  $('#id').textContent = ws.id
  $('#call').disabled = false
  $('#peer').value = ''
  $('#start').addEventListener('submit', (e) => {
    e.preventDefault();
    window.peerid = $('#peer').value; // save to global
    if (peerid === '') return alert('input peerid')

    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    debug(constraint)
    navigator.mediaDevices.getUserMedia(constraint)
      .then((stream) => {
        info('1. addStream()')
        rtc.addStream(stream)
        // TODO: fixme with addTrack if chrome supports
        // stream.getTracks().forEach((track) => {
        //   rtc.addTrack(track, stream)
        // })
        // ここで negotiation needed が発火する
        $('#local').srcObject = stream
      })
  })
})

rtc.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. ice candidate を送信')
  ws.emit('candidate', {from: ws.id, to: window.peerid, data: candidate})
})

rtc.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offer を作成')
  rtc.createOffer()
    .then((rtcSessionDescription) => {
      info('4. offer を local に適用')
      return rtc.setLocalDescription(rtcSessionDescription)
    })
    .then(() => {
      info('4. offer を送信')
      ws.emit('offer', {from: ws.id, to: window.peerid, data: rtc.localDescription})
    })
    .catch((err) => console.error(err))
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

ws.on('offer', ({from: from, to: to, data: description}) => {
  if (to !== ws.id) return
  info('5. offer を受信')
  info(description.sdp)
  rtc.setRemoteDescription(description)
    .then((e) => {
      info('5. answer を作成')
      return rtc.createAnswer()
    })
    .then((rtcSessionDescription) => {
      info('6. answer を local に適用')
      return rtc.setLocalDescription(rtcSessionDescription)
    })
    .then(() => {
      info('6. answer を送信')
      ws.emit('answer', {from: ws.id, to: from, data: rtc.localDescription})
    })
    .catch((err) => console.error(err))
})

ws.on('answer', ({from: from, to: to, data: description}) => {
  info('6. answer を受信')
  info(description.sdp)
  if (to !== ws.id) return
  rtc.setRemoteDescription(description)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})

ws.on('candidate', ({from: from, to: to, data: candidate}) => {
  if (to !== ws.id) return
  info('7. 受信した ice candidate を適用')
  info(candidate.candidate)
  rtc
    .addIceCandidate(candidate)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})
