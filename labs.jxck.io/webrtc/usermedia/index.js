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
      return Promise.resolve(new Stream(stream, constraints));
    });
  }

  constructor(stream, constraints) {
    this.stream = stream
    this.constraints = constraints;
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


class Configure extends React.Component {
  constructor() {
    super();
    this.state = {audio: {}, video: {}};
  }

  bindRef(form) {
    this.form = form
  }

  onChange(e) {
    const type = e.target.type;
    const name = e.target.name;
    const state = this.state;

    let value = e.target.value;
    if (type === "number") {
      value = parseFloat(value);
    }
    if (type === "checkbox") {
      value = e.target.checked;
    }

    // videoinput/audioinput/audiooutput
    const [tag, key] = name.replace('input', '').replace('output', '').split('.');
    state[tag][key] = value;
    this.setState(state);
  }

  render() {
    const { onSubmit } = this.props;
    const constraints = JSON.stringify(this.state, ' ', ' ');
    return (
      <form ref={this.bindRef.bind(this)} onChange={this.onChange.bind(this)} onSubmit={onSubmit}>
        <DeviceContainer />
        <textarea name="constraints" value={constraints}></textarea>
        <div>
          <input type="number" name="video.width"  placeholder="width"  step="10"/>
          <input type="number" name="video.height" placeholder="height" step="10"/>
          <input type="number" name="video.frameRate" placeholder="frameRate" min="1" max="60"/>
          <input type="number" name="video.aspectRatio" placeholder="aspectRatio" min="1.0" step="0.1"/>
          <input type="number" name="audio.volume" placeholder="volume" min="0.1" max="1.0" step="0.1"/>
          <input type="checkbox" name="audio.echoCancellation" placeholder="echoCancellation" placeholder="echoCancellation"/>
        </div>
        <button type="submit">ok</button>
      </form>
    )
  }
}









// Components
class StreamComponent extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    let constraints = JSON.parse(e.target.constraints.value);

    // stop current stream before replace to new
    this.props.stream && this.props.stream.stop()
    this.props.getStream(constraints)
  }

  render() {
    const { stream } = this.props;
    return (
      <section>
        <Configure onSubmit={this.onSubmit.bind(this)}/>
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
      const name = `${d.kind}.deviceId`;
      return (
        <tr>
          <td><input type="radio" name={name} value={d.deviceId}/></td>
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
        <Range type="width" />
        <FacingMode />
        <StreamContainer />
        <ConstraintsContainer />
      </div>
    )
  }
}

class FacingMode extends React.Component {
  constructor() {
    super();
    this.state = {
      facingMode: null,
      ideal: false,
      exact: false,
    }
  }

  get constraints() {
    let mode = this.state.facingMode;
    if (mode === null) {
      return null
    }
    if (this.state.exact) {
      return { facingMode : { exact : mode } }
    }
    if (this.state.ideal) {
      return { facingMode : { ideal: mode } }
    }
    return { facingMode : mode }
  }

  onMode(e) {
    e.stopPropagation();
    const value = e.target.value;
    this.setState(Object.assign(this.state, {facingMode: value}));
  }

  onIdeal(e) {
    e.stopPropagation();
    const value = e.target.checked;
    this.setState(Object.assign(this.state, {ideal: value}));
  }

  onExact(e) {
    e.stopPropagation();
    const value = e.target.checked;
    this.setState(Object.assign(this.state, {exact: value}));
  }

  render() {
    const mode  = "video.facingMode"
    const ideal = "video.facingMode.ideal"
    const exact = "video.facingMode.exact"
    return (
      <dl>
        <dt><label htmlFor={mode}>{mode}</label></dt>
        <dd>
          <select id={mode} name={mode} onChange={this.onMode.bind(this)}>
            <option value="default">default</option>
            <option value="user">user</option>
            <option value="environment">environment</option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </dd>
        <dt><label>{ideal}</label></dt>
        <dd><input type="checkbox" name={ideal} onChange={this.onIdeal.bind(this)}/></dd>
        <dt><label>{exact}</label></dt>
        <dd><input type="checkbox" name={exact} onChange={this.onExact.bind(this)}/></dd>
        <dt>state</dt>
        <dd>{JSON.stringify(this.constraints)}</dd>
      </dl>
    )
  }
}

class Range extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ideal: false,
      exact: false,
      value: null,
      min:   null,
      max:   null,
    }
  }

  get constraints() {
    const type = this.props.type;
    const {ideal, exact, value, min, max} = this.state;

    if (exact) {
      if (value === null) return null
      return { [type] : { exact : value }}
    }

    if (ideal) {
      if (value === null && min === null && max === null) return null
      let result = {}
      if (value) result.ideal = value
      if (min) result.min = min
      if (max) result.max = max
      return { [type]: result }
    }

    if (value === null) return null

    return { [type]: value };
  }

  onExact(e) {
    this.setState(Object.assign(this.state, {exact: e.target.checked}))
  }

  onIdeal(e) {
    this.setState(Object.assign(this.state, {ideal: e.target.checked}))
  }

  onChange(e) {
    const {name, value} = e.target;
    this.setState(Object.assign(this.state, {value: parseInt(value)}))
  }

  render() {
    const type = this.props.type

    let input = <input type="number" name={type} placeholder={type}/>
      if (this.state.ideal) {
        input = (
          [
            <input type="number" name="min" placeholder="min"/>,
            <input type="number" name={type} placeholder="ideal"/>,
            <input type="number" name="max" placeholder="max"/>,
          ]
        )
      }
    if (this.state.exact) {
      input = (
        <input type="number" name={type} placeholder="exact"/>
      )
    }
    return (
      <div>
        <div onChange={this.onChange.bind(this)}>
          {input}
        </div>
        <input type="checkbox" name="ideal" onChange={this.onIdeal.bind(this)}/>
        <input type="checkbox" name="exact" onChange={this.onExact.bind(this)}/>
        <div>{JSON.stringify(this.constraints)}</div>
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
