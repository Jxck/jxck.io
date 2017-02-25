debug = DEBUG ? console.debug.bind(console) : ()=>{}

class WS extends EventEmitter {
  constructor(url, protocols) {
    super()

    this.id = btoa(Math.random()*1000)

    this.ws = new WebSocket(url, protocols)

    this.ws.onopen = (e) => {
      debug(`ws#on('${e.type}')`, e, this.id)
      super.emit('open', e)
    }

    this.ws.onmessage = (e) => {
      const {id, name, message} = JSON.parse(e.data)
      if (id === this.id) return;
      debug(`ws#on('${name}')`, message)
      super.emit(name, message)
    }

    this.ws.onclose = (e) => {
      debug(`ws#on('${e.type}')`, e)
      super.emit('close', e)
    }

    this.ws.onerror = (e) => {
      debug(`ws#on('${e.type}')`, e)
      super.emit('error', e)
    }
  }

  emit(name, message) {
    console.assert(name !== undefined && message !== undefined)
    debug(`ws#send(name, data)`, name, message)
    this.ws.send(JSON.stringify({id: this.id, name, message}))
  }

  close(code, reason) {
    debug(`ws#close(code, reason)`, code, reason)
    this.ws.close(code, reason)
  }
}


class Util {
  static Caps2Params(sendCaps, remoteRecvCaps) {
    let muxId = '';
    let codecs = Util.filterCodecParams(sendCaps.codecs, remoteRecvCaps.codecs);
    let headerExtensions = Util.filterHdrExtParams(sendCaps.headerExtensions, remoteRecvCaps.headerExtensions);
    let encodings = [];

    // RTCRtcpParameters
    let rtcp = {
      ssrc: 0,
      cname: '',
      reducedSize: false,
      mux: true,
    };

    // RTCRtpParameters
    return { muxId, codecs, headerExtensions, encodings, rtcp };
  }

  static filterCodecParams(left, right) {
    let codecPrms = [];

    if (left && right) {
      left.forEach(function(leftItem) {
        for (let i = 0; i < right.length; i++) {
          let codec = right[i];
          let equality = (leftItem.name == codec.name &&
            leftItem.kind === codec.kind &&
            leftItem.preferredPayloadType === codec.preferredPayloadType &&
            leftItem.numChannels === codec.numChannels);

          if (equality) {
            let codecParams = {
              name: codec.name,
              payloadType: codec.preferredPayloadType,
              clockRate: codec.clockRate,
              numChannels: codec.numChannels,
              rtcpFeedback: codec.rtcpFeedback,
              parameters: codec.parameters,
            };
            codecPrms.push(codecParams);

            break;
          }
        }
      });
    }

    return codecPrms;
  }

  static filterHdrExtParams(left, right) {
    let hdrExtPrms = [];
    return hdrExtPrms;
  }

  static RTCRtpEncodingParameters(ssrc, codecPayloadType, fec, rtx, priority, maxBitrate, minQuality, framerateBias, resolutionScale, framerateScale, active, encodingId, dependencyEncodingId) {
    codecPayloadType = codecPayloadType || 0;
    fec = fec || 0;
    rtx = rtx || 0;
    priority = priority || 1.0;
    maxBitrate = maxBitrate || 2000000.0;
    minQuality = minQuality || 0;
    framerateBias = framerateBias || 0.5;
    resolutionScale = resolutionScale || 1.0;
    framerateScale = framerateScale || 1.0;
    active = active || true;

    return {
      ssrc,
      codecPayloadType,
      fec,
      rtx,
      priority,
      maxBitrate,
      minQuality,
      framerateBias,
      resolutionScale,
      framerateScale,
      active,
      encodingId,
      dependencyEncodingId,
    }
  }
}


(function(global) {
  'use strict';
  let id = location.hash;
  let socket = new WS('wss://ws.jxck.io', ['broadcast', 'ortc-demo']);

  let iceOptions = { gatherPolicy: 'all', iceServers: [] };

  let iceGathr = null;
  let iceTr = null;
  let dtlsTr = null;

  let Transports = {
    sender: {
      video: null,
      audio: null,
    },
    recver: {
      video: null,
      audio: null,
    }
  };

  // local capabilities
  let Caps = {
    sender: {
      video: null,
      audio: null,
    },
    recver: {
      video: null,
      audio: null,
    }
  };

  // remote parameters
  let Params = {
    sender: {
      video: null,
      audio: null,
    },
    recver: {
      video: null,
      audio: null,
    }
  }

  let videoRenderer = document.getElementById('remote');
  let renderStream = new MediaStream();

  let selfInfo = {};
  let peerInfo = {};
  let remoteCandidates = [];
  let localCandidatesCreated = false;
  let remoteIceParams = null;
  let remoteDtlsParams = null;

  let trackCount = 0;

  let SSRC = {
    audio: 100,
    video: 200,
  };

  function sendTrack(track) {
    let kind = track.kind;
    Transports.sender[kind] = new RTCRtpSender(track, dtlsTr);
    Caps.sender[kind] = RTCRtpSender.getCapabilities(kind);
    socket.emit('capability', {
      id: id,
      caps: {
        kind: kind,
        role: 'sender',
        caps: Caps.sender[kind],
        muxId: null,
      }
    });
  }

  function recvTrack(kind) {
    Transports.recver[kind] = new RTCRtpReceiver(dtlsTr, kind);
    Caps.recver[kind] = RTCRtpReceiver.getCapabilities(kind);
    renderStream.addTrack(Transports.recver[kind].track);
    socket.emit('capability', {
      id: id,
      caps: {
        kind: kind,
        role: 'receiver',
        caps: Caps.recver[kind],
      }
    });
  }

  function connectRequest() {
    console.info('---- connectRequest ----');
    socket.emit('connectRequest', {
      id: id
    });
  }

  function handleCallRequest(message) {
    console.info('---- handleCallRequest ----');

    // accept
    peerInfo.id = message.id;

    // 送ってきた 相手を controlling として start する
    socket.emit('start', {
      id: id,
      dtlsrole: 'controlling',
    });

    // 自分を controlled として start する
    selfInfo.dtlsRole = 'controlled';
    initiateConnection();

    console.log('Accepted Peer:', peerInfo.id, 'connection request.');
  }

  function transportSend(kind, remote) {
    let ssrc = SSRC[kind];
    let encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    let sendParams = Util.Caps2Params(Caps.sender[kind], remote.caps);
    sendParams.encodings.push(encodingParams);
    Transports.sender[kind].send(sendParams);
  }

  function transportRecv(kind, remote) {
    let ssrc = SSRC[kind];
    let encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    let recvParams = Util.Caps2Params(remote.caps, Caps.recver[kind]);
    recvParams.muxId = remote.muxId;
    recvParams.encodings.push(encodingParams);
    Transports.recver[kind].receive(recvParams);
  }

  function initiateConnection() {
    console.log('---- initiateConnection ----');

    iceGathr = new RTCIceGatherer(iceOptions);
    iceTr = new RTCIceTransport();
    dtlsTr = new RTCDtlsTransport(iceTr);

    iceGathr.ongatherstatechange = function(e) {
      console.error(e);
    }

    iceGathr.onlocalcandidate = function(evt) {
      socket.emit('candidate', {
        id: id,
        candidate: evt.candidate,
      });

      localCandidatesCreated = false;

      if (Object.keys(evt.candidate).length == 0) {
        console.info('---- Local ICE Candidate Complete ----');

        // candidate の生成が終了
        localCandidatesCreated = true;

        // parameter を相手に送る
        socket.emit('params', {
          id: id,
          params: {
            ice: iceGathr.getLocalParameters(),
            dtls: dtlsTr.getLocalParameters()
          }
        });

        // candidate を生成してる途中に相手から
        // すでに parameter を受け取っていたらここで start()
        // まだなら onparameter で start()
        if (remoteIceParams) {
          iceTr.start(iceGathr, remoteIceParams, selfInfo.dtlsRole);

          dtlsTr.start(remoteDtlsParams);
        }
      } else {
        console.log('Local ICE candidate: ', evt.candidate.ip + ':' + evt.candidate.port);
      }
    };

    iceTr.onicestatechange = function(e) {
      console.log('ICE State Change', iceTr.state, e.state);
    };

    iceTr.oncandidatepairchange = function(e) {
      console.info('ICE Candidate Pair Change:', e.pair, e);
    };

    iceGathr.onerror = function(e) {
      console.error('ICE ERROR', e);
    };

    dtlsTr.ondtlsstatechange = function(e) {
      console.log('DTLS State Change', dtlsTr.state, e.state);
    };

    dtlsTr.onerror = function(e) {
      console.error('DTLS ERROR', e);
    };


    // Get a local stream
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        facingMode: 'user'
      }
    }).then((stream) => {
      console.info('---- getUserMedia ----');
      let $local = document.getElementById('local');
      $local.srcObject = stream;

      return stream;
    }).then(gotMedia)
      .catch(console.error.bind(console));
  }

  function gotMedia(stream) {
    // gUM で取得した stream を sender/recver を生成
    // capability を送る。

    // Send Audio/Video
    let audioTracks = stream.getAudioTracks();
    let videoTracks = stream.getVideoTracks();
    let audioTrack = audioTracks[0];
    let videoTrack = videoTracks[0];
    sendTrack(audioTrack);
    sendTrack(videoTrack);

    // Receive Audio/Video
    recvTrack('audio');
    recvTrack('video');

    // この時点で先に相手の Parameter を受け取っていたら
    // sender.send() / recver.receive() を始める
    // もしまだ transport がなかったら
    // transport 作るときにやるからここは無視
    if (Params.recver.audio) {
      let remote = Params.recver.audio;
      if (Transports.recver.audio) {
        let kind = remote.kind;
        transportRecv(kind, remote);

        trackCount++;
        if (trackCount == 2) {
          videoRenderer.srcObject = renderStream;
        }
      }
    }

    if (Params.recver.video) {
      let remote = Params.recver.video;
      if (Transports.recver.video) {
        let kind = remote.kind;
        transportRecv(kind, remote);

        trackCount++;
        if (trackCount == 2) {
          videoRenderer.srcObject = renderStream;
        }
      }
    }

    if (Params.sender.audio) {
      let kind = 'audio';
      let remote = Params.sender[kind];
      if (Transports.sender[kind]) {
        transportSend(kind, remote);
      }
    }

    if (Params.sender.video) {
      let kind = 'video';
      let remote = Params.sender[kind];
      if (Transports.sender[kind]) {
        transportSend(kind, remote);
      }
    }
  }

  window.onload = function() {
    document.getElementById('connect').addEventListener('click', connectRequest);

    socket.on('connectRequest', (message) => {
      if (message.id === id) return;
      console.log(JSON.stringify(message));

      handleCallRequest(message);
    });

    socket.on('start', (message) => {
      if (message.id === id) return;
      console.log(JSON.stringify(message));

      selfInfo.dtlsRole = message.dtlsrole;
      initiateConnection();
    });

    socket.on('candidate', (message) => {
      if (message.id === id) return;
      console.log(JSON.stringify(message));
      if (!(iceTr && dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      console.log('Remote ICE candidate:', message.candidate.ip + ':' + message.candidate.port);

      if (Object.keys(message.candidate).length > 0) {
        remoteCandidates.push(message.candidate);
      } else {
        console.info('---- Remote ICE Candidate Complete ----');
        iceTr.setRemoteCandidates(remoteCandidates);
      }
    });

    socket.on('params', (message) => {
      if (message.id === id) return;
      console.log(JSON.stringify(message));
      if (!(iceTr && dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      // 相手からの parameter を受け取った

      // candidate を送り終わって無いと start() できないので取っておく
      let remote = message.params;
      remoteIceParams = remote.ice;
      remoteDtlsParams = remote.dtls;

      // すでに local からの candidate を全て送り終わっていたら
      // 受け取った parameter で start()
      if (localCandidatesCreated) {
        iceTr.start(iceGathr, remoteIceParams, selfInfo.dtlsRole);
        dtlsTr.start(remoteDtlsParams);
      }
    });

    socket.on('capability', (message) => {
      if (message.id === id) return;
      console.log(JSON.stringify(message));
      if (!(iceTr && dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      // 相手から来た capability を受け取る
      // すでに sender/receiver が作られていれば send()/receive() を
      // なければ Params に保存する。
      let remote = message.caps;
      let kind = remote.kind;

      // role は送ってきた側が sender/receiver のどちあらかを表す
      // 逆側に設定する。
      if (remote.role === 'sender') {
        if (Transports.recver[kind]) {
          transportRecv(kind, remote);

          trackCount++;
          if (trackCount == 2) {
            videoRenderer.srcObject = renderStream;
          }
        } else {
          Params.recver[kind] = remote;
        }
      }

      if (remote.role === 'receiver') {
        if (Transports.sender[kind]) {
          transportSend(kind, remote);
        } else {
          Params.sender[kind] = remote;
        }
      }
    });
  };

}(typeof window === 'object' ? window : global));
