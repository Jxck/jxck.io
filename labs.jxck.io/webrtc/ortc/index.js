debug = DEBUG ? console.info.bind(console) : ()=>{}

// polyfill
window.RTCIceRole  = (window.RTCIceRole !== undefined)  ? RTCIceRole  : { controlling: "controlling", controlled: "controlled" }
window.RTCDtlsRole = (window.RTCDtlsRole !== undefined) ? RTCDtlsRole : { auto: "auto", client: "client", server: "server" }


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


class ORTC extends EventEmitter {
  constructor(id) {
    super();

    this.id = id;

    this.iceOptions = {
      gatherPolicy: 'all',
      iceServers: []
    };


    // RTCIceGatherer
    this.rtcIceGatherer = null;


    // RTCIceTransport
    this.rtcIceTransport = new RTCIceTransport();

    this.rtcIceTransport.onstatechange = (e) => {
      debug(e.type, e.state, e);
    };

    this.rtcIceTransport.onicestatechange = (e) => {
      // deprecated ?
      debug(e.type, e.state, e);
    };

    this.rtcIceTransport.oncandidatepairchange = (e) => {
      debug(e.type, e.pair, e);
    };


    // RTCDtlsTransport
    this.rtcDtlsTransport = new RTCDtlsTransport(this.rtcIceTransport);

    this.rtcDtlsTransport.ondtlsstatechange = (e) => {
      debug(e.type, e.state, e);
    };

    this.rtcDtlsTransport.onerror = (e) => {
      console.error(e.type, e);
    };


    this.Transports = {
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
    this.Caps = {
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
    this.Params = {
      sender: {
        video: null,
        audio: null,
      },
      recver: {
        video: null,
        audio: null,
      }
    }

    this.mediaStream = new MediaStream();
    this.mediaStream.onaddtrack = (e) => {
      console.log(e);
    }
    this.mediaStream.onremovetrack = (e) => {
      console.log(e);
    }

    this.rtcIceRole = null;
    this.localCandidatesCreated = false;
    this.rtcIceParameters = null;
    this.rtcDtlsParameters = null;

    this.trackCount = 0;

    this.SSRC = {
      audio: 100,
      video: 200,
    };
  }

  getLocalParameters() {
    return {
      rtcIceParameters:  this.rtcIceGatherer.getLocalParameters(),
      rtcDtlsParameters: this.rtcDtlsTransport.getLocalParameters(),
    }
  }

  start() {
    this.rtcIceTransport.start(this.rtcIceGatherer, this.rtcIceParameters, this.rtcIceRole);
    this.rtcDtlsTransport.start(this.rtcDtlsParameters);
  }

  sendTrack(track) {
    let kind = track.kind;
    this.Transports.sender[kind] = new RTCRtpSender(track, this.rtcDtlsTransport);
    this.Caps.sender[kind] = RTCRtpSender.getCapabilities(kind);
    this.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'sender',
        caps: this.Caps.sender[kind],
        muxId: null,
      }
    });
  }

  addRemoteCandidate(candidate) {
    debug('addRemoteCandidate()', candidate.type, candidate.ip, candidate.port);
    this.rtcIceTransport.addRemoteCandidate(candidate);
  }

  recvCapability(message) {
    // 相手から来た capability を受け取る
    // すでに sender/receiver が作られていれば send()/receive() を
    // なければ Params に保存する。
    let remote = message.caps;
    let kind = remote.kind;

    // role は送ってきた側が sender/receiver のどちあらかを表す
    // 逆側に設定する。
    if (remote.role === 'sender') {
      if (this.Transports.recver[kind]) {
        this.transportRecv(kind, remote);

        this.trackCount++;
        if (this.trackCount == 2) {
          super.emit('mediastream', this.mediaStream);
        }
      } else {
        this.Params.recver[kind] = remote;
      }
    }

    if (remote.role === 'receiver') {
      if (this.Transports.sender[kind]) {
        this.transportSend(kind, remote);
      } else {
        this.Params.sender[kind] = remote;
      }
    }
  }

  recvTrack(kind) {
    this.Transports.recver[kind] = new RTCRtpReceiver(this.rtcDtlsTransport, kind);
    this.Caps.recver[kind] = RTCRtpReceiver.getCapabilities(kind);
    this.mediaStream.addTrack(this.Transports.recver[kind].track);
    this.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'receiver',
        caps: this.Caps.recver[kind],
      }
    });
  }

  transportSend(kind, remote) {
    const ssrc = this.SSRC[kind];
    const encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    const sendParams = Util.Caps2Params(this.Caps.sender[kind], remote.caps);
    sendParams.encodings.push(encodingParams);
    this.Transports.sender[kind].send(sendParams);
  }

  transportRecv(kind, remote) {
    const ssrc = this.SSRC[kind];
    const encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    const recvParams = Util.Caps2Params(remote.caps, this.Caps.recver[kind]);
    recvParams.muxId = remote.muxId;
    recvParams.encodings.push(encodingParams);
    this.Transports.recver[kind].receive(recvParams);
  }

  initiateConnection(rtcIceRole) {
    this.rtcIceRole = rtcIceRole;

    // RTCIceGatherer
    this.rtcIceGatherer = new RTCIceGatherer(this.iceOptions);

    this.rtcIceGatherer.onstatechange = (e) => {
      debug(e.type, e);
    }

    this.rtcIceGatherer.onlocalcandidate = (e) => {
      debug(e.type, e);

      const candidate = e.candidate;

      debug('localcandidate', candidate);
      super.emit('localcandidate', candidate);

      // polyfill for RTCIceCandidateComplete
      if (Object.keys(candidate).length == 0) {
        debug('localcandidatecomplete', candidate);
        super.emit('localcandidatecomplete');
      }
    };

    this.rtcIceGatherer.onerror = (e) => {
      console.error(e.type, e);
    };


    super.emit('needstream');
  }

  addStream(stream) {
    // gUM で取得した stream を sender/recver を生成
    // capability を送る。

    // Send Audio/Video
    const audioTracks = stream.getAudioTracks();
    const videoTracks = stream.getVideoTracks();
    const audioTrack = audioTracks[0];
    const videoTrack = videoTracks[0];
    this.sendTrack(audioTrack);
    this.sendTrack(videoTrack);

    // Receive Audio/Video
    this.recvTrack('audio');
    this.recvTrack('video');

    // この時点で先に相手の Parameter を受け取っていたら
    // sender.send() / recver.receive() を始める
    // もしまだ transport がなかったら
    // transport 作るときにやるからここは無視
    if (this.Params.recver.audio) {
      const remote = this.Params.recver.audio;
      if (this.Transports.recver.audio) {
        const kind = remote.kind;
        this.transportRecv(kind, remote);

        this.trackCount++;
        if (this.trackCount == 2) {
          super.emit('mediastream', this.mediaStream);
        }
      }
    }

    if (this.Params.recver.video) {
      let remote = this.Params.recver.video;
      if (this.Transports.recver.video) {
        let kind = remote.kind;
        this.transportRecv(kind, remote);

        this.trackCount++;
        if (this.trackCount == 2) {
          super.emit('mediastream', this.mediaStream);
        }
      }
    }

    if (this.Params.sender.audio) {
      let kind = 'audio';
      let remote = this.Params.sender[kind];
      if (this.Transports.sender[kind]) {
        this.transportSend(kind, remote);
      }
    }

    if (this.Params.sender.video) {
      let kind = 'video';
      let remote = this.Params.sender[kind];
      if (this.Transports.sender[kind]) {
        this.transportSend(kind, remote);
      }
    }
  }
}

window.onload = function() {
  const id = location.hash
  const ortc = new ORTC(id)
  const socket = new WS('wss://ws.jxck.io', ['broadcast', 'ortc-demo'])
  const $video = document.getElementById('remote');


  ortc.on('mediastream', (stream) => {
    $video.srcObject = stream
  });

  ortc.on('localcandidate', (candidate) => {
    socket.emit('candidate', {
      id: id,
      candidate: candidate,
    });
  });

  ortc.on('needstream', () => {
    // Get a local stream
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: id,
      },
    }).then((stream) => {
      // console.info('---- getUserMedia ----', stream);
      let $local = document.getElementById('local');
      $local.srcObject = stream;
      ortc.addStream(stream);
    }).catch((err) => {
      console.error(err);
    });
  });

  ortc.on('capability', (e) => {
    socket.emit('capability', e);
  });

  ortc.on('localcandidatecomplete', () => {
    // candidate の生成が終了
    ortc.localCandidatesCreated = true;

    // parameter を相手に送る
    socket.emit('params', {
      id: id,
      params: ortc.getLocalParameters(),
    });

    // candidate を生成してる途中に相手から
    // すでに parameter を受け取っていたらここで start()
    // まだなら onparameter で start()
    if (ortc.rtcIceParameters) {
      ortc.start()
    }
  });

  socket.on('params', (message) => {
    // 相手からの parameter を受け取った

    // candidate を送り終わって無いと start() できないので取っておく
    const params = message.params;
    ortc.rtcIceParameters = params.rtcIceParameters;
    ortc.rtcDtlsParameters = params.rtcDtlsParameters;

    // すでに local からの candidate を全て送り終わっていたら
    // 受け取った parameter で start()
    if (ortc.localCandidatesCreated) {
      ortc.start();
    }
  });

  socket.on('candidate', (message) => {
    ortc.addRemoteCandidate(message.candidate);
  });

  socket.on('capability', (message) => {
    ortc.recvCapability(message);
  });

  socket.on('start', (message) => {
    ortc.initiateConnection(message.rtcIceRole);
  });

  socket.on('open', () => {
    console.log('open');
    document.getElementById('connect').addEventListener('click', () => {



      // 相手を controlled として start する
      socket.emit('start', {
        id: id,
        rtcIceRole: RTCIceRole.controlling,
      });



      // 自分を controlling として start する
      ortc.initiateConnection(RTCIceRole.controlled);
    })
  })
}
