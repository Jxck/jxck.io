const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $ = document.querySelector.bind(document)
const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])

const id = btoa(Math.random()*1000)
const constraint = {audio:true, video: true}

//const url = new URL(location.href)
//const turn = url.searchParams.get('turn') === 'true'
const turn = true;
const rtc  = new RTC(id, turn ? Config : undefined)

ws.on('open', () => {
  $('#id').textContent = ws.id
  $('#call').disabled = false
  $('#peer').value = ''
  $('#start').addEventListener('submit', async (e) => {
    e.preventDefault();
    window.peerid = $('#peer').value; // save to global
    if (peerid === '') return alert('input peerid')

    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    debug(constraint)
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
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

rtc.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. ice candidate を送信')
  ws.emit('candidate', {from: ws.id, to: window.peerid, data: candidate})
})

rtc.on('negotiationneeded', async () => {
  try {
    info('2. onnegotiationneeded が発生したらネゴシエーションする')
    info('3. offer を作成')
    const rtcSessionDescription = await rtc.createOffer()
    info('4. offer を local に適用')
    await rtc.setLocalDescription(rtcSessionDescription)
    info('4. offer を送信')
    ws.emit('offer', {from: ws.id, to: window.peerid, data: rtc.localDescription})
  } catch (err) {
    error(err)
  }
})

rtc.on('track', (e) => {
  if (e.track.kind === 'video') {
    // track が複数あがるので 1 回でいい。
    $('#remote').srcObject = e.streams[0]
  }
})

rtc.on('addstream', (stream) => {
  $('#remote').srcObject = stream
})

ws.on('offer', async ({from, to, data: description}) => {
  try {
    if (to !== ws.id) return
    info('5. offer を受信')
    info(description.sdp)
    await rtc.setRemoteDescription(description)

    info('5. answer を作成')
    const rtcSessionDescription = await rtc.createAnswer()

    info('6. answer を local に適用')
    await rtc.setLocalDescription(rtcSessionDescription)

    info('6. answer を送信')
    ws.emit('answer', {from: ws.id, to: from, data: rtc.localDescription})
  } catch (err) {
    error(err)
  }
})

ws.on('answer', async ({from, to, data: description}) => {
  try {
    info('6. answer を受信')
    info(description.sdp)
    if (to !== ws.id) return
    await rtc.setRemoteDescription(description)
  } catch (err) {
    error(err)
  }
})

ws.on('candidate', async ({from, to, data: candidate}) => {
  try {
    if (to !== ws.id) return
    info('7. 受信した ice candidate を適用')
    info(candidate.candidate)
    await rtc.addIceCandidate(candidate)
  } catch (err) {
    error(err)
  }
})
