const log   = console.log.bind(console)
const info  = console.info.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document)
const ws = new WS('wss://sfu.jxck.io/');

const constraint = {audio: true, video: true}
const id = btoa(Math.random()*1000)
const rtc  = new RTC(id)

ws.on('open', (e) => {
  $('#id').textContent = ws.id
  $('#call').addEventListener('click', (e) => {
    navigator.mediaDevices.getUserMedia(constraint)
      .then((stream) => {
        info('1. addStream()')
        // ここで negotiation needed が発火する
        rtc.addStream(stream);
        $('#local').srcObject = stream
      })
      .catch((err) => console.error(err))
  })
});

rtc.on('icecandidate', (candidate) => {
  info('7. ice candidate は無視')
})

rtc.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offer を作成')
  const option = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1,
  }
  rtc.createOffer(option)
    .then((offer) => {
      ws.emit('offer', offer)
      // ここで setLocalDescription はしない
    })
    .catch((err) => console.error(err))
});

rtc.on('iceconnectionstatechange', (state) => {
  info(state);
});

rtc.on('addstream', (stream) => {
  info('addstream', stream)
  $('#remote').srcObject = stream;
});

ws.on('offer', ({to, sdp}) => {
  if (to !== ws.id) return

  info('5. offer を受信')
  warn(sdp.sdp.match(/a=candidate:udpcandidate.*/)[0])

  rtc.setRemoteDescription(sdp)
    .then(() => {
      info('5. answer を作成')
      return rtc.createAnswer()
    })
    .then((rtcSessionDescription) => {
      info('6. answer を local に適用')
      return rtc.setLocalDescription(rtcSessionDescription)
    })
    .then(() => {
      info('6. answer を送信')
      ws.emit('answer', rtc.localDescription)
    })
    .catch((err) => console.error(err))
});

ws.on('answer', ({to, sdp}) => {
  if (to !== ws.id) return

  info('6. answer を受信')
  warn(sdp.sdp.match(/a=candidate:udpcandidate.*/)[0])

  rtc.setRemoteDescription(sdp)
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})
