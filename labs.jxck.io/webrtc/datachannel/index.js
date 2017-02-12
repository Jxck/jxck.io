const log   = console.log.bind(console);
const info  = console.info.bind(console);
const error = console.error.bind(console);

let local = new RTCPeerConnection();
let remote  = new RTCPeerConnection();

[
  'onicecandidateerror',
  'onicegatheringstatechange',
  'onfingerprintfailure',
  'onaddstream',
  'onremovestream',
].forEach((ev) => {
  local[ev]   = error;
  remote[ev]  = error;
});

// signalingstatechange で状態が以下の順で変わる
//  "stable"
//  "have-local-offer"
//  "have-remote-offer"
//  "have-local-pranswer"
//  "have-remote-pranswer"
local.onsignalingstatechange = (e) => {
  log(`${e.type}:\tlocal:\t[${local.signalingState}]`);
}

remote.onsignalingstatechange = (e) => {
  log(`${e.type}:\tremote:\t[${remote.signalingState}]`);
}



// 7. ice candidate を交換
local.onicecandidate = (e) => {
  if (e.candidate === null) return;

  info('7. local で上がった ice candidate を remote に渡す');
  log(e.candidate.candidate);
  remote
    .addIceCandidate(e.candidate)
    .then(log)
    .catch(log);
}

remote.onicecandidate = (e) => {
  if (e.candidate === null) return;

  info('7. remote で上がった ice candidate を local に渡す');
  log(e.candidate.candidate);
  local
    .addIceCandidate(e.candidate)
    .then(log)
    .catch(log);
}


// 8. checking -> connected -> completed
//  "new"
//  "checking"
//  "connected"
//  "completed"
//  "failed"
//  "disconnected"
//  "closed"
local.oniceconnectionstatechange = (e) => {
  info('8. local  の state が変わる')
  log(`${e.type}:\tlocal:\t[${local.iceConnectionState}, ${local.iceGatheringState}]`);
}

remote.oniceconnectionstatechange = (e) => {
  info('8. remote の state が変わる')
  log(`${e.type}:\tremote:\t[${remote.iceConnectionState}, ${local.iceGatheringState}]`);
}


Promise.all([
  new Promise((done, fail) => {
    local.onnegotiationneeded = done
  }),
  new Promise((done, fail) => {
    remote.onnegotiationneeded = done
  }),

]).then(([e1, e2]) => {
  log(e1.type, e2.type);
  info('2. onnegotiationneeded が発生したらネゴシエーションする');

  info('3. local の offer を作成');
  return local.createOffer();

}).then((rtcSessionDescription) => {

  info('4. local の offer を双方に適応');
  log(rtcSessionDescription.type, rtcSessionDescription.sdp);
  return Promise.all([
    local.setLocalDescription(rtcSessionDescription),
    remote.setRemoteDescription(rtcSessionDescription),
  ]);

}).then((e) => {

  info('5. remote の offer を作成');
  return remote.createAnswer();

}).then((rtcSessionDescription) => {

  info('6. remote の offer を双方に適応');
  log(rtcSessionDescription.type, rtcSessionDescription.sdp);
  return Promise.all([
    local.setRemoteDescription(rtcSessionDescription),
    remote.setLocalDescription(rtcSessionDescription),
  ]);

}).catch(console.error.bind(console))




// firefox では createDataChannel か addStream してないと
// createOffer() できない
info('1. createDataChannel()');
const localchannel  = local.createDataChannel('localchannel');
const remotechannel = remote.createDataChannel('remotechannel');

local.ondatachannel = (e) => {
  info('9. local  で remote DataChannel ができる')

  const channel = e.channel;

  channel.onopen = (e) => {
    info('10. channelmote との 接続 が open する');

    info('11, local から remote にメッセージを送る');
    channel.send("from local");

    localchannel.onmessage = (e) => {
      info('14. local で remote からのメッセージを受け取る')
      log(e.data);
    }
  }
}

remote.ondatachannel = (e) => {
  info('9. remote で local DataChannel ができる')

  const channel = e.channel;

  channel.onopen = (e) => {
    info('10. local との接続が open する');

    remotechannel.onmessage = (e) => {
      info('12. remote で local からのメッセージを受け取る')
      log(e.data);

      info('13. remote から remote にメッセージを送る')
      channel.send("from remote");
    }
  }
}


[
  "onbufferedamountlow",
  "onerror",
  "onclose",
].forEach((ev) => {
  localchannel[ev]  = error;
  remotechannel[ev] = error;
});
