const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document)
const ws = new WS('ws://localhost:3001/');

const constraint = {audio: true, video: true}
const id = btoa(Math.random()*1000)
const rtc  = new RTC(id)

ws.on('open', (e) => {
  $('#call').addEventListener('click', (e) => {
    e.preventDefault()

    navigator.mediaDevices.getUserMedia(constraint)
      .then((stream) => {
        info('1. addStream()')
        // ここで negotiation needed が発火する
        rtc.addStream(stream);
        $('#local').srcObject = stream
      }).catch((err) => console.error(err))
  })
});

rtc.on('icecandidate', (candidate) => {
  info('7. ice candidate は無視')
})

rtc.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offer を作成')
  rtc.createOffer().then((offer) => {
    info('4. offer を local に適用')
    return rtc.setLocalDescription(offer);
  }).then(() => {
    info('4. offer を送信')
    ws.emit('offer', rtc.localDescription) // TODO:
  }).catch((err) => console.error(err))
});

rtc.on('iceconnectionstatechange', (state) => {
  info(state);
});

rtc.on('addstream', (stream) => {
  $('#remote').srcObject = stream;
});

ws.on('offer', ({to, sdp}) => {
  if (to !== ws.id) return

  info('5. offer を受信')
  warn(sdp.sdp.match(/a=candidate:udpcandidate.*/)[0])

  rtc.setRemoteDescription(sdp).then((e) => {
    info('5. answer を作成')
    return rtc.createAnswer()
  }).then((rtcSessionDescription) => {
    info('6. answer を local に適用')
    return rtc.setLocalDescription(rtcSessionDescription)
  }).catch((err) => console.error(err))
});

ws.on('answer', ({to, sdp}) => {
  if (to !== ws.id) return

  info('6. answer を受信')
  warn(sdp.sdp.match(/a=candidate:udpcandidate.*/)[0])

  rtc.setRemoteDescription(sdp)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})
