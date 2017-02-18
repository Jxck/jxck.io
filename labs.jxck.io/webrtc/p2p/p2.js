const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)


const ws = new WS('wss://ws.jxck.io', 'echo');

ws.on('open', () => {
  let $ready = document.querySelector('#ready')
  $ready.textContent = 'ready'

  ws.on('message', (e) => {
    log(e)
  })
})



//const local = new RTC('local')
//const remote  = new RTC('remote')
//
//local.on('icecandidate', (candidate) => {
//  if (candidate === null) return
//
//  info('7. local で上がった ice candidate を remote に渡す')
//  log(candidate.candidate)
//  remote
//    .addIceCandidate(candidate)
//    .then((e) => console.log(e))
//    .catch((err) => console.error(err))
//})
//
//remote.on('icecandidate', (candidate) => {
//  if (candidate === null) return
//
//  info('7. remote で上がった ice candidate を local に渡す')
//  log(candidate.candidate)
//  local
//    .addIceCandidate(candidate)
//    .then((e) => console.log(e))
//    .catch((err) => console.error(err))
//})
//
//local.on('iceconnectionstatechange', (e) => {
//  info('8. local  の state が変わる', local.iceConnectionState, local.iceGatheringState)
//})
//
//remote.on('iceconnectionstatechange', (e) => {
//  info('8. remote  の state が変わる', remote.iceConnectionState, remote.iceGatheringState)
//})
//
//
//Promise.all([
//  new Promise((done, fail) => {
//    local.on('negotiationneeded', done)
//  }),
//]).then(([e1, e2]) => {
//  info('2. onnegotiationneeded が発生したらネゴシエーションする')
//  info('3. local の offer を作成')
//  return local.createOffer()
//}).then((rtcSessionDescription) => {
//  info('4. local の offer を双方に適応')
//  log(rtcSessionDescription.type, rtcSessionDescription.sdp)
//  return Promise.all([
//    local.setLocalDescription(rtcSessionDescription),
//    remote.setRemoteDescription(rtcSessionDescription),
//  ])
//}).then((e) => {
//  info('5. remote の offer を作成')
//  return remote.createAnswer()
//}).then((rtcSessionDescription) => {
//  info('6. remote の offer を双方に適応')
//  log(rtcSessionDescription.type, rtcSessionDescription.sdp)
//  return Promise.all([
//    local.setRemoteDescription(rtcSessionDescription),
//    remote.setLocalDescription(rtcSessionDescription),
//  ])
//})
//  .then((e) => console.log(e))
//  .catch((err) => console.error(err))
//
//
//local.on('channel', (channel) => {
//  info('9. local で remote との接続が open する')
//
//  setTimeout(() => {
//    info('11, local から remote にメッセージを送る')
//    channel.send("from local")
//  }, 100)
//
//  channel.on('message', (data) => {
//    info('14. local で remote からのメッセージを受け取る')
//    log(data)
//
//    channel.on('close', (e) => {
//      info('16. local で on close が発生')
//    })
//
//    info('15. local を close する')
//    channel.close()
//  })
//})
//
//remote.on('channel', (channel) => {
//  info('10. remote で DataChannel ができる')
//
//  channel.on('message', (data) => {
//    info('12. remote で local からのメッセージを受け取る')
//    log(data)
//
//    info('13. remote から local にメッセージを送る')
//    channel.send("from remote")
//
//    channel.on('close', (e) => {
//      info('17. remote で local の close を補足')
//
//      info('18. remote を close する')
//      channel.close()
//    })
//  })
//})
//
//
//// firefox では createDataChannel か addStream してないと
//// createOffer() できない
//info('1. createDataChannel()')
//local.createDataChannel('channel')
