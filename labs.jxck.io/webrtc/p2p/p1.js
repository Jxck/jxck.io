const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)


const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-p2p-demo'])

ws.on('open', () => {
  let $call = document.querySelector('#call')
  $call.disabled = false
  $call.addEventListener('click', () => {
    log('click')
    call()
  })
})

const offerer = new RTC('offerer')

offerer.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. offerer で上がった ice candidate を remote に渡す')
  ws.send({type: 'offer_candidate', candidate: candidate});
})

offerer.on('iceconnectionstatechange', (e) => {
  info('8. offerer の state が変わる', offerer.iceConnectionState, offerer.iceGatheringState)
})

offerer.on('negotiationneeded', () => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. offerer の offer を作成')
  offerer.createOffer().then((rtcSessionDescription) => {
    info('4. offerer の offerer を適応し送信')
    ws.send(rtcSessionDescription)
    return offerer.setLocalDescription(rtcSessionDescription)
  })
    .then((e) => console.log(e))
    .catch((err) => console.error(err))
});


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
});

offerer.on('channel', (channel) => {
  info('9. offerer で answerer との接続が open する')

  setTimeout(() => {
    info('11, offerer から answerer にメッセージを送る')
    channel.send("from offerer")
  }, 100)

  channel.on('message', (data) => {
    info('14. offerer で answerer からのメッセージを受け取る')
    log(data)

    channel.on('close', (e) => {
      info('16. offerer で on close が発生')
    })

    info('15. offerer を close する')
    channel.close()
  })
})

function call() {
  // firefox では createDataChannel か addStream してないと
  // createOffer() できない
  info('1. createDataChannel()')
  offerer.createDataChannel('channel')
  // ここで negotiation needed が発火する
}
