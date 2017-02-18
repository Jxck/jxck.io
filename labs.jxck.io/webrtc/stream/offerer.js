const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)

const $local = document.querySelector('#local')
const $remote = document.querySelector('#remote')

const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

ws.on('open', () => {
  let $call = document.querySelector('#call')
  $call.disabled = false
  $call.addEventListener('click', () => {
    // firefox では createDataChannel か addStream してないと
    // createOffer() できない
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
      .then((stream) => {
        info('1. addTrack()')
        stream.getTracks().forEach((track) => {
          offerer.addTrack(track, stream); // TODO: fixme with addTrack if chrome supports
        });
        // ここで negotiation needed が発火する
        $local.srcObject = stream
      })
  })
})

const offerer = new RTC('offerer')

offerer.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. offerer で上がった ice candidate を remote に渡す')
  ws.send({type: 'offer_candidate', candidate: candidate})
})

offerer.on('iceconnectionstatechange', (e) => {
  info('8. offerer の state が変わる', offerer.iceConnectionState, offerer.iceGatheringState)
})

offerer.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offerer の offer を作成')
  offerer.createOffer().then((rtcSessionDescription) => {
    info('4. offerer の offer を適応し送信')
    log(rtcSessionDescription.type, rtcSessionDescription.sdp)
    ws.send(rtcSessionDescription)
    return offerer.setLocalDescription(rtcSessionDescription)
  })
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
})


ws.on('message', (message) => {
  if (message.type === 'answer') {
    offerer.setRemoteDescription(message)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }

  if (message.type === 'answer_candidate') {
    const candidate = message.candidate

    info('7. answer で上がった ice candidate を offerer に適応')
    offerer
      .addIceCandidate(candidate)
      .then((e) => console.log(e))
      .catch((err) => console.error(err))
  }
})
