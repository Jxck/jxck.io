const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)


const ws = new WS('wss://ws.jxck.io', ['broadcast', 'webrtc-datachannel-demo'])

ws.on('open', () => {
  let $ready = document.querySelector('#ready')
  $ready.textContent = 'ready'
})

const id = 'answerer'
const answerer  = new RTC(id)

answerer.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. answwerer で上がった ice candidate を offerer に渡す')
  ws.emit('candidate', candidate)
})

answerer.on('iceconnectionstatechange', (e) => {
  info('8. answerer  の state が変わる', answerer.iceConnectionState, answerer.iceGatheringState)
})

ws.on('offer', async (message) => {
  try {
    await answerer.setRemoteDescription(message)
    info('5. answerer の answer を作成')
    const rtcSessionDescription = await answerer.createAnswer()
    info('6. answerer の answer を適応し送信')
    log(rtcSessionDescription.type, rtcSessionDescription.sdp)
    ws.emit('answer', rtcSessionDescription)
    await answerer.setLocalDescription(rtcSessionDescription)
  } catch (err) {
    error(err)
  }
})

ws.on('candidate', async (candidate) => {
  try {
    info('7. offerer で上がった ice candidate を answer に適応')
    await answerer.addIceCandidate(candidate)
  } catch (err) {
    error(err)
  }
})

answerer.on('channel', (channel) => {
  info('10. answerer で DataChannel ができる')

  channel.on('message', (data) => {
    info('12. answerer で offerer からのメッセージを受け取る')
    document.querySelector('#message').textContent = data

    info('13. answerer から offerer にメッセージを送る')
    channel.send("from answerer")

    channel.on('close', (e) => {
      info('17. answerer で offerer の close を補足')

      info('18. answerer を close する')
      channel.close()
    })
  })
})
