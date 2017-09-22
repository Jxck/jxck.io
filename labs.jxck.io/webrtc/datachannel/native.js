const log   = console.log.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)

let local = new RTCPeerConnection()
let remote  = new RTCPeerConnection()


// signalingstatechange で状態が以下の順で変わる
//  "stable"
//  "have-local-offer"
//  "have-remote-offer"
//  "have-local-pranswer"
//  "have-remote-pranswer"
local.onsignalingstatechange = (e) => {
  log(`${e.type}:\tlocal:\t[${local.signalingState}]`)
}

remote.onsignalingstatechange = (e) => {
  log(`${e.type}:\tremote:\t[${remote.signalingState}]`)
}


// ice candidate を交換
local.onicecandidate = async (e) => {
  try {
    if (e.candidate === null) return

    info('7. local で上がった ice candidate を remote に渡す')
    log(e.candidate.candidate)
    await remote.addIceCandidate(e.candidate)
  } catch(err) {
    error(err)
  }
}

remote.onicecandidate = async (e) => {
  try {
    if (e.candidate === null) return

    info('7. remote で上がった ice candidate を local に渡す')
    log(e.candidate.candidate)
    await local.addIceCandidate(e.candidate)
  } catch (err) {
    error(err)
  }
}


// checking -> connected -> completed
//  "new"
//  "checking"
//  "connected"
//  "completed"
//  "failed"
//  "disconnected"
//  "closed"
local.oniceconnectionstatechange = (e) => {
  info('8. local  の state が変わる')
  log(`${e.type}:\tlocal:\t[${local.iceConnectionState}, ${local.iceGatheringState}]`)
}

remote.oniceconnectionstatechange = (e) => {
  info('8. remote の state が変わる')
  log(`${e.type}:\tremote:\t[${remote.iceConnectionState}, ${local.iceGatheringState}]`)
}


[
  'onicecandidateerror',
  'onicegatheringstatechange',
  'onfingerprintfailure',
  'onaddstream',
  'onremovestream',
].forEach((ev) => {
  local[ev]  = info
  remote[ev] = info
});


(async () => {
  try {
    const e1 = await new Promise((done, fail) => {
      local.onnegotiationneeded = done
    })

    log(e1.type)
    info('2. onnegotiationneeded が発生したらネゴシエーションする')

    info('3. local の offer を作成')
    const rtcSessionDescriptionOffer = await local.createOffer()

    info('4. local の offer を双方に適応')
    log(rtcSessionDescriptionOffer.type, rtcSessionDescriptionOffer.sdp)
    await Promise.all([
      local.setLocalDescription(rtcSessionDescriptionOffer),
      remote.setRemoteDescription(rtcSessionDescriptionOffer),
    ])

    info('5. remote の offer を作成')
    const rtcSessionDescriptionAnswer = await remote.createAnswer()

    info('6. remote の offer を双方に適応')
    log(rtcSessionDescriptionAnswer.type, rtcSessionDescriptionAnswer.sdp)
    await Promise.all([
      local.setRemoteDescription(rtcSessionDescriptionAnswer),
      remote.setLocalDescription(rtcSessionDescriptionAnswer),
    ])
  } catch (err) {
    error(err)
  }
})()


// firefox では createDataChannel か addStream してないと
// createOffer() できない
info('1. createDataChannel()')
const channel_local  = local.createDataChannel('channel')

channel_local.onopen = (e) => {
  info('10. local で remote との接続が open する')

  setTimeout(() => {
    info('11, local から remote にメッセージを送る')
    channel_local.send("from local")
  }, 100)

  channel_local.onmessage = (e) => {
    info('14. local で remote からのメッセージを受け取る')
      document.querySelector('#from_remote').textContent = e.data

    channel_local.onclose = (e) => {
      info('16. local で on close が発生')
    }

    info('15. local を close する')
    channel_local.close()
  }
}

remote.ondatachannel = (e) => {
  info('9. remote で DataChannel ができる')

  const channel_remote = e.channel

  channel_remote.onopen = (e) => {
    info('10. remote で local との接続が open する')

    channel_remote.onmessage = (e) => {
      info('12. remote で local からのメッセージを受け取る')
      document.querySelector('#from_local').textContent = e.data

      info('13. remote から local にメッセージを送る')
      channel_remote.send("from remote")

      channel_remote.onclose = (e) => {
        info('19. remote で on close が発生')

        info('20. remote, local を close する')
        remote.close()
        local.close()
      }

      channel_remote.onclose = (e) => {
        info('17. remote で local の close を補足')

        info('18. remote を close する')
        channel_remote.close()
      }
    }
  }

  [
    "onbufferedamountlow",
    "onerror",
  ].forEach((ev) => {
    channel_remote[ev] = error
  })
}


[
  "onbufferedamountlow",
  "onerror",
].forEach((ev) => {
  channel_local[ev]  = error
})
