const log = console.log.bind(console);

/***********************************
 * Stream
 ***********************************/

// class
class Track {
  constructor(track) {
    this.track = track
  }

  get kind      () { return this.track.kind       }
  get id        () { return this.track.id         }
  get label     () { return this.track.label      }
  get enabled   () { return this.track.enabled    }
  get muted     () { return this.track.muted      }
  get readyState() { return this.track.readyState }

  getConstraints() {
    const support = !!MediaStreamTrack.prototype.getConstraints;
    return support ? this.track.getConstraints() : {};
  }

  getCapabilities() {
    const support = !!MediaStreamTrack.prototype.getCapabilities;
    return support ? this.track.getCapabilities() : {};
  }

  getSettings() {
    const support = !!MediaStreamTrack.prototype.getSettings;
    return support ? this.track.getSettings() : {};
  }

  stop() {
    log('track#stop()');
    return this.track.stop();
  }
}

class Stream {
  static getUserMedia(constraints) {
    // polyfill
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || function(conf) {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      return new Promise((resolve, reject) => {
        navigator.getUserMedia(conf, resolve, reject);
      });
    };
    return navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      log(stream);
      return Promise.resolve(new Stream(stream));
    });
  }

  constructor(stream) {
    this.stream = stream
  }

  get id() {
    return this.stream.id
  }
  get active() {
    return this.stream.active
  }
  get src() {
    return URL.createObjectURL(this.stream);
  }

  tracks() {
    return this.stream
      .getTracks()
      .map((track) => new Track(track))
  }

  stop() {
    this.tracks().forEach((track) => track.stop())
  }
}

// Action
const getStream = (constraints, dispatch) => {

  log(constraints);

  Stream.getUserMedia(constraints).then((stream) => {
    // resolve stream
    dispatch({
      type: 'GET_STREAM',
      stream: stream,
    })
  }).catch((err) => {
    console.error(err);
  });
}

// Reducer
const streamReducer = (state = {stream: undefined}, action) => {
  switch (action.type) {
    case 'GET_STREAM':
      return Object.assign({}, state, {
        stream: action.stream,
      })
    default:
      return state
  }
}

// Components
class Tracks extends React.Component {
  render() {
    const { tracks } = this.props;
    const tr = tracks.map((track) => {
      return (
        <tr>
          <td>{track.kind}</td>
          <td>{track.id}</td>
          <td>{track.label}</td>
          <td>{track.enabled}</td>
          <td>{track.muted}</td>
          <td>{track.readyState}</td>
        </tr>
      )
    });

    return (
      <table>
        <tr>
          <th>kind</th>
          <th>id</th>
          <th>label</th>
          <th>enabled</th>
          <th>muted</th>
          <th>readyState</th>
        </tr>
        {tr}
      </table>
    )
  }
}

class Video extends React.Component {
  componentDidUpdate() {
    // FIXME: if React supports srcObject
    this.video.srcObject = this.props.stream.stream;
  }

  bindVideo(video) {
    this.video = video;
  }

  render() {
    const { stream } = this.props;
    if (stream === undefined) {
      return <p>empty</p>
    }

    return (
      <div>
        <p>
          <span>stream.active:</span><strong>{stream.active ? 'active': 'innactive'} </strong>
          <span>stream.id:</span><strong>{stream.id}</strong>
        </p>
        <video autoPlay controls ref={this.bindVideo.bind(this)}></video>
      </div>
    )
  }
}

// Components
class StreamComponent extends React.Component {
  componentDidMount() {
    // TODO: remove
    // this.props.getStream();
  }

  onSubmit(e) {
    e.preventDefault();
    let value = JSON.parse(e.target.setting.value);

    let facingMode = e.target.facingMode.value;
    if (facingMode !== "default") {
      value.video.facingMode = facingMode;
    }

    let deviceId = e.target.deviceId.value;
    if (deviceId) {
      value.video.deviceId = deviceId;
    }

    let width = e.target.width.value;
    if (width) {
      value.video.width = width;
    }

    let height = e.target.height.value;
    if (height) {
      value.video.height = height;
    }

    // stop current stream before replace to new
    this.props.stream && this.props.stream.stop()
    this.props.getStream(value)
  }

  render() {
    const { stream } = this.props;
    const setting = JSON.stringify({
      audio: true,
      video: {
        deviceId: 'default'
      }
    }, ' ', ' ');
    return (
      <section>
        <form onSubmit={this.onSubmit.bind(this)}>
          <DeviceContainer />
          <textarea name="setting">{setting}</textarea>
          <div>
            <select name="facingMode">
              <option value="default">default</option>
              <option value="user">user</option>
              <option value="environment">environment</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
            <input type="number" name="width"  placeholder="width"  step="10" />
            <input type="number" name="height" placeholder="height" step="10" />
          </div>
          <button type="submit">ok</button>
        </form>
        <h2>Stream</h2>
        <Video stream={stream} />
        <Tracks tracks={stream ? stream.tracks() : []} />
      </section>
    )
  }
}

// Container
const StreamContainer = ReactRedux.connect(
  (state) => {
    return {
      stream: state.stream.stream,
    }
  },
  (dispatch) => {
    return {
      getStream(constraints) {
        getStream(constraints, dispatch)
      }
    }
  }
)(StreamComponent);




/***********************************
 * Constraints
 ***********************************/

// Action
const getSupportedConstraints = (dispatch) => {
  const keys = navigator.mediaDevices.getSupportedConstraints();
  let supported = Object.keys(keys).sort((a, b) => {
    if (a.startsWith('moz')) return 1;
    return (a.length > b.length) ? 1 : -1;
  });
  dispatch({
    type: 'SUPPORTED_CONSTRAINTS',
    supported, supported,
  })
}

// Reducer
const constraintsReducer = (state = {supported: []}, action) => {
  switch (action.type) {
    case 'SUPPORTED_CONSTRAINTS':
      return Object.assign({}, state, {
        supported: action.supported
      })
    default:
      return state
  }
}

// Components
class Constraints extends React.Component {
  componentDidMount() {
    this.props.getSupportedConstraints();
  }

  render() {
    const { supported, tracks } = this.props;
    const th = supported.map((key) => <th>{key}</th>)

    const consts = tracks.map((track) => {
      const values = track.getConstraints();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>constraints({track.kind})</td>{td}</tr>;
    });

    const caps = tracks.map((track) => {
      const values = track.getCapabilities();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>capabilities({track.kind})</td>{td}</tr>;
    });

    const settings = tracks.map((track) => {
      const values = track.getSettings();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>settings({track.kind})</td>{td}</tr>;
    });

    return (
      <section>
        <h2>Constraints</h2>
        <table>
          <tr>
            <th>type</th>
            {th}
          </tr>
          {consts}
          {caps}
          {settings}
        </table>
      </section>
    )
  }
}

// Container
const ConstraintsContainer = ReactRedux.connect(
  (state) => {
    const stream = state.stream.stream;
    return {
      supported: state.constraints.supported,
      tracks: stream ? stream.tracks() : [],
    }
  },
  (dispatch) => {
    return {
      getSupportedConstraints() {
        getSupportedConstraints(dispatch)
      }
    }
  }
)(Constraints);




/***********************************
 * Device
 ***********************************/

// Action
const enumDevice = (dispatch) => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    dispatch({
      type: 'ENUM_DEVICE',
      devices: devices.sort((a, b) => a.kind > b.kind ? 1: -1),
    });
  });

  navigator.mediaDevices.ondevicechange = (e) => {
    enumDevice(dispatch);
  };
}

// Reducer
const deviceReducer = (state = {devices: []}, action) => {
  switch (action.type) {
    case 'ENUM_DEVICE':
      return Object.assign({}, state, {
        devices: action.devices
      })
    default:
      return state
  }
}

// Component
class Device extends React.Component {
  componentDidMount() {
    this.props.onEnumDevice();
  }

  render() {
    const {onEnumDevice, devices} = this.props
    const tr = devices.map((d) => {
      return (
        <tr>
          <td><input type="radio" name="deviceId" value={d.deviceId}/></td>
          <td><div>{d.kind}    </div></td>
          <td><div>{d.label}   </div></td>
          <td><div>{d.deviceId}</div></td>
          <td><div>{d.groupId} </div></td>
        </tr>
      )
    });
    return (
      <section>
        <h2>Devices</h2>
        <button onClick={onEnumDevice}>refresh</button>
        <table>
          <tr>
            <th>select</th>
            <th>kind</th>
            <th>label</th>
            <th>deviceId</th>
            <th>groupId</th>
          </tr>
          {tr}
        </table>
      </section>
    )
  }
}

// Container
const DeviceContainer = ReactRedux.connect(
  (state) => {
    return {
      devices: state.device.devices,
    }
  },
  (dispatch) => {
    return {
      onEnumDevice() {
        enumDevice(dispatch)
      }
    }
  }
)(Device);


/**
 * App
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <StreamContainer />
        <ConstraintsContainer />
      </div>
    )
  }
}

const AppContainer = ReactRedux.connect(
  (state) => {
    return {
    }
  },
  (dispatch) => {
    return {
    }
  }
)(App);


const reducer = Redux.combineReducers({
  device: deviceReducer,
  stream: streamReducer,
  constraints: constraintsReducer,
});
const store = Redux.createStore(reducer)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
