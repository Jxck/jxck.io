const log = console.log.bind(console)
const jog = (e) => log(JSON.stringify(e))

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
    const support = !!MediaStreamTrack.prototype.getConstraints
    return support ? this.track.getConstraints() : {}
  }

  getCapabilities() {
    const support = !!MediaStreamTrack.prototype.getCapabilities
    return support ? this.track.getCapabilities() : {}
  }

  getSettings() {
    const support = !!MediaStreamTrack.prototype.getSettings
    return support ? this.track.getSettings() : {}
  }

  stop() {
    return this.track.stop()
  }
}

class Stream {
  static getUserMedia(constraint) {
    return navigator.mediaDevices.getUserMedia(constraint).then((stream) => {
      return Promise.resolve(new Stream(stream, constraint))
    })
  }

  constructor(stream, constraint) {
    this.stream = stream
    this.constraint = constraint
  }

  get id() {
    return this.stream.id
  }
  get active() {
    return this.stream.active
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
const getStream = (constraint, dispatch) => {
  Stream.getUserMedia(constraint).then((stream) => {
    // resolve stream
    dispatch({
      type: 'GET_STREAM',
      stream: stream,
    })
  }).catch((err) => {
    console.error(err)
  })
}

// Reducer
const streamReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_STREAM':
      return action.stream
    default:
      return state
  }
}

// Components
class Tracks extends React.Component {
  render() {
    const { tracks } = this.props
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
    })

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
  }

  bindVideo(video) {
    this.video = video
    this.video.srcObject = this.props.stream.stream
  }

  render() {
    const { stream } = this.props
    if (stream === null) {
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

const formatConstraint = (raw) => {
  return Object.keys(raw).reduce((acc, key) => {
    if (key === 'audioinput') {
      acc.audio.deviceId = raw.audioinput
      return acc
    }

    if (key === 'videoinput') {
      acc.video.deviceId = raw.videoinput
      return acc
    }

    let [target, type] = key.split('.')
    acc[target][type] = raw[key].toJSON()
    return acc
  }, {video:{}, audio:{}})
}

class StreamComponent extends React.Component {
  onClick(e) {
    const constraint = formatConstraint(this.props.constraint)
    if (this.props.stream) this.props.stream.stop() // stop if existed
    this.props.getStream(constraint)
  }

  render() {
    const { stream } = this.props
    return (
      <div className="flex">
        <section>
          <h2>Stream</h2>
          <button onClick={this.onClick.bind(this)}>start</button>
          <Video stream={stream} />
        </section>
        <section>
          <h2>Tracks</h2>
          <Tracks tracks={stream ? stream.tracks() : []} />
        </section>
      </div>
    )
  }
}

// Container
const StreamContainer = ReactRedux.connect(
  (state) => {
    return {
      stream: state.stream,
      constraint: state.constraint,
    }
  },
  (dispatch) => {
    return {
      getStream(constraint) {
        getStream(constraint, dispatch)
      }
    }
  }
)(StreamComponent)




/***********************************
 * Device
 ***********************************/

// ActionCreator
const enumDevice = (dispatch) => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    dispatch({
      type: 'ENUM_DEVICE',
      devices: devices.sort((a, b) => a.kind > b.kind ? 1: -1),
    })
  })

  navigator.mediaDevices.ondevicechange = (e) => {
    enumDevice(dispatch)
  }
}

const selectDevice = (dispatch, e) => {
  const {name, value} = e.target
  dispatch({
    type: 'SELECT_DEVICE',
    device: {name, value}
  })
}

// Reducer
const deviceReducer = (state = [], action) => {
  switch (action.type) {
    case 'ENUM_DEVICE':
      return Object.assign([], state, action.devices)
    default:
      return state
  }
}

// Component
class Device extends React.Component {
  componentDidMount() {
    this.props.onEnumDevice()
  }

  render() {
    const {onEnumDevice, onSelectDevice, devices} = this.props
    const tr = devices.map((d) => {
      const disabled = d.kind.endsWith("output") ? true : false
      return (
        <tr>
          <td><input type="radio" name={d.kind} value={d.deviceId} disabled={disabled} onChange={onSelectDevice}/></td>
          <td><div>{d.kind}    </div></td>
          <td><div>{d.label}   </div></td>
          <td><div>{d.deviceId}</div></td>
          <td><div>{d.groupId} </div></td>
        </tr>
      )
    })
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
      devices: state.devices
    }
  },
  (dispatch) => {
    return {
      onEnumDevice() {
        enumDevice(dispatch)
      },
      onSelectDevice(event) {
        selectDevice(dispatch, event)
      }
    }
  }
)(Device)




/***********************************
 * FacingMode
 ***********************************/

// DTO
class FacingModeValue {
  constructor(mode, ideal, exact) {
    this.mode  = mode
    this.ideal = ideal
    this.exact = exact
  }

  toJSON() {
    const {mode, ideal, exact} = this

    if (mode === "") {
      return null
    }
    if (exact) {
      return { exact : mode }
    }
    if (ideal) {
      return { ideal: mode }
    }

    return mode
  }
}

// ActionCreator
const selectFacing = (dispatch, value) => {
  return dispatch({
    type: 'SELECT_FACING',
    value: value
  })
}

// Component
class FacingMode extends React.Component {
  onChange() {
    this.props.onSelectFacing(new FacingModeValue(
      this.mode.value,
      this.ideal.checked,
      this.exact.checked,
    ))
  }

  bindElem(elem) {
    if (elem === null) return
    this[elem.name] = elem
  }

  render() {
    const mode  = "mode"
    const ideal = "ideal"
    const exact = "exact"
    return (
      <div className="flex" onChange={this.onChange.bind(this)}>
        <div>{mode}</div>

        <div>
          <select ref={this.bindElem.bind(this)} id={mode} name={mode}>
            {[
              "",
              "default",
              "user",
              "environment",
              "left",
              "right",
            ].map((option) => {
              return <option value={option}>{option}</option>
            })}
          </select>
        </div>

        <div>
          <label htmlFor={ideal}>{ideal}</label>
          <input type="checkbox" id={ideal} name={ideal} ref={this.bindElem.bind(this)}/>
        </div>

        <div>
          <label htmlFor={exact}>{exact}</label>
          <input type="checkbox" id={exact} name={exact} ref={this.bindElem.bind(this)}/>
        </div>
      </div>
    )
  }
}

// Container
const FacingModeContainer = ReactRedux.connect(
  (state) => {
    return {
    }
  },
  (dispatch) => {
    return {
      onSelectFacing(event) {
        selectFacing(dispatch, event)
      }
    }
  }
)(FacingMode)




/***********************************
 * Range
 ***********************************/

// DTO
class RangeValue {
  constructor(type, ideal, exact, min, max, value) {
    this.type  = type
    this.ideal = ideal
    this.exact = exact
    this.value = value
    this.min   = min
    this.max   = max
  }

  parseFloat(val) {
    if (val === "") return null
    if (val === null) return null
    return parseFloat(val)
  }

  toJSON() {
    const {type, ideal, exact, value, min, max} = this

    if (exact) {
      if (value === null) return null
      return { exact : this.parseFloat(value) }
    }

    if (ideal) {
      if (value === null && min === null && max === null) return null
      let result = {}
      if (value || value ===0) result.ideal = this.parseFloat(value)
      if (min   || min   ===0) result.min = this.parseFloat(min)
      if (max   || max   ===0) result.max = this.parseFloat(max)
      return result
    }

    if (value === null) return null

    return this.parseFloat(value)
  }
}

// ActionCreator
const onRange = (dispatch, value) => {
  return dispatch({
    type: 'SELECT_RANGE',
    value: value
  })
}

// Component
class Range extends React.Component {
  onChange() {
    this.props.onRange(new RangeValue(
      this.props.type,
      this.ideal.checked,
      this.exact.checked,
      this.min ? this.min.value : null,
      this.max ? this.max.value : null,
      this.value.value
    ))
  }

  bindElem(elem) {
    if (elem === null) return
    this[elem.name] = elem
  }

  render() {
    const {type, min, max, step, state} = this.props

    const value = "value"
    const ideal = "ideal"
    const exact = "exact"

    let input = (
      <div>
        <input type="number" placeholder={type} name={value} min={min} max={max} step={step} value={state && state.value} ref={this.bindElem.bind(this)}/>
      </div>
    )

    if (state && state.ideal) {
      input = (
        [
          <input type="number" name="min"   placeholder="min"   min={min} max={max} step={step} value={state && state.min} ref={this.bindElem.bind(this)}/>,
          <input type="number" name={value} placeholder={value} min={min} max={max} step={step} value={state && state.value} ref={this.bindElem.bind(this)}/>,
          <input type="number" name="max"   placeholder="max"   min={min} max={max} step={step} value={state && state.max} ref={this.bindElem.bind(this)}/>,
        ]
      )
    }

    if (state && state.exact) {
      input = (
        <div>
          <label>
            {exact}
            <input type="number" placeholder={exact} name={type} min={min} max={max} step={step} value={state && state.value} ref={this.bindElem.bind(this)}/>
          </label>
        </div>
      )
    }

    return (
      <div className="flex" onChange={this.onChange.bind(this)}>
        <div>{type}</div>

        {input}

        <div>
          <label>
            {ideal}
            <input type="checkbox" id={ideal} name={ideal} ref={this.bindElem.bind(this)}/>
          </label>
        </div>

        <div>
          <label>
            {exact}
            <input type="checkbox" id={exact} name={exact} ref={this.bindElem.bind(this)}/>
          </label>
        </div>
      </div>
    )
  }
}

// Container
const RangeContainer = ReactRedux.connect(
  (state, ownProps) => {
    const {type} = ownProps
    const value = state.constraint[type]
    return {state: value}
  },
  (dispatch) => {
    return {
      onRange(value) {
        onRange(dispatch, value)
      }
    }
  }
)(Range)

// Reducer
const constraintReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_DEVICE':
      const {name, value} = action.device
      return Object.assign({}, state, {[name]: value})
    case 'SELECT_FACING':
      const facingMode = action.value
      return Object.assign({}, state, {"video.facingMode": facingMode})
    case 'SELECT_RANGE':
      const range = action.value
      return Object.assign({}, state, {[range.type]: range})
    default:
      return state
  }
}




/***********************************
 * Display
 ***********************************/

// Component
class Display extends React.Component {
  render() {
    const raw = this.props.constraint
    const formatted = formatConstraint(raw)
    return (
      <section>
        <h2>constraints</h2>
        <textarea value={`// formatted
${JSON.stringify(formatted, ' ', ' ')}

// raw
${JSON.stringify(raw, ' ', ' ')}
`}></textarea>
      </section>
    )
  }
}

// Container
const DisplayContainer = ReactRedux.connect(
  (state) => {
    return {
      constraint: state.constraint
    }
  },
  (dispatch) => {
    return {
    }
  }
)(Display)




/***********************************
 * Controllers
 ***********************************/

// Component
class Controllers extends React.Component {
  // TODO: channelCount, echoCancellation
  render() {
    return (
      <div className="flex">
        <DeviceContainer />
        <section>
          <h2>settings</h2>
          <FacingModeContainer />
          <RangeContainer type="video.width"       min="100" max="200"  step="10"   />
          <RangeContainer type="video.height"      min="100" max="200"  step="10"   />
          <RangeContainer type="video.latency"     min="0"   max="100"  step="10"   />
          <RangeContainer type="video.frameRate"   min="0"   max="60"   step="10"   />
          <RangeContainer type="video.aspectRatio" min="0"   max="3"    step="0.1"  />
          <RangeContainer type="audio.volume"      min="0"   max="1"    step="0.1"  />
          <RangeContainer type="audio.sampleRate"  min="0"   max="9600" step="1000" />
          <RangeContainer type="audio.sampleSize"  min="16"  max="32"   step="16"   />
        </section>
        <DisplayContainer />
      </div>
    )
  }
}

// Container
const ControllersContainer = ReactRedux.connect(
  (state) => {
    return {
    }
  },
  (dispatch) => {
    return {
    }
  }
)(Controllers)




/***********************************
 * Constraints
 ***********************************/

// ActionCreator
const getSupportedConstraints = (dispatch) => {
  const keys = navigator.mediaDevices.getSupportedConstraints()
  let supported = Object.keys(keys).sort((a, b) => {
    if (a.startsWith('moz')) return 1
    return (a.length > b.length) ? 1 : -1
  })
  dispatch({
    type: 'SUPPORTED_CONSTRAINTS',
    supported, supported,
  })
}

// Reducer
const supportedConstraintsReducer = (state = {supported: []}, action) => {
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
class SupportedConstraints extends React.Component {
  componentDidMount() {
    this.props.getSupportedConstraints()
  }

  render() {
    const { supported, tracks } = this.props
    const th = supported.map((key) => <th>{key}</th>)

    const consts = tracks.map((track) => {
      const values = track.getConstraints()
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>)

      return <tr><td>constraints({track.kind})</td>{td}</tr>
    })

    const caps = tracks.map((track) => {
      const values = track.getCapabilities()
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>)

      return <tr><td>capabilities({track.kind})</td>{td}</tr>
    })

    const settings = tracks.map((track) => {
      const values = track.getSettings()
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>)

      return <tr><td>settings({track.kind})</td>{td}</tr>
    })

    return (
      <section>
        <h2>Supported Constraints</h2>
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
const SupportedConstraintsContainer = ReactRedux.connect(
  (state) => {
    const stream = state.stream
    return {
      supported: state.supportedConstraints.supported,
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
)(SupportedConstraints)




/***********************************
 * App
 ***********************************/
class App extends React.Component {
  render() {
    return (
      <div>
        <StreamContainer />
        <ControllersContainer />
        <SupportedConstraintsContainer />
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
)(App)


const reducer = Redux.combineReducers({
  devices:    deviceReducer,
  constraint: constraintReducer,
  stream:     streamReducer,
  supportedConstraints: supportedConstraintsReducer,
})
const store = Redux.createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
