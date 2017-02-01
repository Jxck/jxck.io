const log = console.log.bind(console);
/***********************************
 * pollyfill
 ***********************************/
navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || function(conf) {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  return new Promise((resolve, reject) => {
    navigator.getUserMedia(conf, resolve, reject);
  });
};



/***********************************
 * Stream
 ***********************************/

// Action
const getStream = (dispatch) => {
  const constraints = {
    audio: true,
    video: true,
  };
  navigator
    .mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      dispatch({
        type: 'GET_STREAM',
        stream: stream,
        tracks: stream.getTracks()
      })
    });
}

// Reducer
const streamReducer = (state = {stream: undefined, tracks: []}, action) => {
  switch (action.type) {
    case 'GET_STREAM':
      return Object.assign({}, state, {
        stream: action.stream,
        tracks: action.tracks,
      })
    default:
      return state
  }
}

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
  render() {
    const { stream } = this.props;
    if (stream === undefined) {
      return <p>empty</p>
    }

    const src = URL.createObjectURL(stream);
    return (
      <div>
        <p>stream.active: {stream.active ? 'active': 'innactive'}</p>
        <p>stream.id: {stream.id}</p>
        <video autoPlay controls src={src}></video>
      </div>
    )
  }
}

// Components
class Stream extends React.Component {
  render() {
    const { stream, tracks, getStream } = this.props;
    return (
      <section>
        <h2>Stream</h2>
        <Video stream={stream} />
        <Tracks tracks={tracks} />
        <button onClick={getStream}>start</button>
      </section>
    )
  }
}

// Container
const StreamContainer = ReactRedux.connect(
  (state) => {
    return {
      stream: state.stream.stream,
      tracks: state.stream.tracks,
    }
  },
  (dispatch) => {
    return {
      getStream() {
        getStream(dispatch)
      }
    }
  }
)(Stream);




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
    supported, supported
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
    const { supported, stream, tracks } = this.props;
    const th = supported.map((key) => <th>{key}</th>)

    return (
      <section>
        <h2>Constraints</h2>
        <table>
          <tr>{th}</tr>
        </table>
      </section>
    )
  }
}

// Container
const ConstraintsContainer = ReactRedux.connect(
  (state) => {
    return {
      supported: state.constraints.supported,
      tracks: state.stream.tracks,
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
          <td>{d.kind}</td>
          <td>{d.label}</td>
          <td>{d.deviceId}</td>
          <td>{d.groupId}</td>
        </tr>
      )
    });
    return (
      <section>
        <h2>Devices</h2>
        <button onClick={onEnumDevice}>refresh</button>
        <table>
          <tr>
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
        <DeviceContainer />
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
