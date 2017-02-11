const log = console.log.bind(console);

/***********************************
 * Device
 ***********************************/

// ActionCreator
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

const selectDevice = (dispatch, e) => {
  const {name, value} = e.target
  dispatch({
    type: 'SELECT_DEVICE',
    device: {name, value}
  });
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
    this.props.onEnumDevice();
  }

  render() {
    const {onEnumDevice, onSelectDevice, devices} = this.props
    const tr = devices.map((d) => {
      return (
        <tr>
          <td><input type="radio" name={d.kind} value={d.deviceId} onChange={onSelectDevice}/></td>
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
)(Device);




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
    const {mode, ideal, exact} = this;

    if (mode === "") {
      return null;
    }
    if (exact) {
      return { exact : mode };
    }
    if (ideal) {
      return { ideal: mode };
    }

    return mode;
  }
}

// ActionCreator
const selectFacing = (dispatch, value) => {
  return dispatch({
    type: 'SELECT_FACING',
    value: value
  });
}

// Component
class FacingMode extends React.Component {
  onChange() {
    this.props.onSelectFacing(new FacingModeValue(
      this.mode.value,
      this.ideal.checked,
      this.exact.checked,
    ));
  }

  bindElem(elem) {
    if (elem === null) return
    this[elem.name] = elem;
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
)(FacingMode);




/***********************************
 * Range
 ***********************************/

// DTO
class RangeValue {
  constructor(type, ideal, exact, min, max, value) {
    this.type  = type
    this.ideal = ideal
    this.exact = exact
    this.value = this.parseFloat(value)
    this.min   = this.parseFloat(min)
    this.max   = this.parseFloat(max)
  }

  parseFloat(val) {
    if (val === "") return null
    if (val === null) return null
    return parseFloat(val);
  }

  toJSON() {
    const {type, ideal, exact, value, min, max} = this;

    if (exact) {
      if (value === null) return null
      return { exact : value }
    }

    if (ideal) {
      if (value === null && min === null && max === null) return null
      let result = {}
      if (value || value ===0) result.ideal = value
      if (min   || min   ===0) result.min = min
      if (max   || max   ===0) result.max = max
      return result
    }

    if (value === null) return null

    return value
  }
}

// ActionCreator
const onRange = (dispatch, value) => {
  return dispatch({
    type: 'SELECT_RANGE',
    value: value
  });
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
    ));
  }

  bindElem(elem) {
    if (elem === null) return
    this[elem.name] = elem;
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
        <div>{JSON.stringify(this.constraints)}</div>
      </div>
    )
  }
}

// Container
const RangeContainer = ReactRedux.connect(
  (state, ownProps) => {
    const {type} = ownProps;
    const value = state.constraint[type];
    return {state: value}
  },
  (dispatch) => {
    return {
      onRange(value) {
        onRange(dispatch, value)
      }
    }
  }
)(Range);

// Reducer
const constraintReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_DEVICE':
      const {name, value} = action.device
      return Object.assign({}, state, {[name]: value});
    case 'SELECT_FACING':
      const facingMode = action.value;
      return Object.assign({}, state, {"facingMode": facingMode});
    case 'SELECT_RANGE':
      const range = action.value
      return Object.assign({}, state, {[range.type]: range});
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
    const constraint = JSON.stringify(this.props.constraint, ' ', ' ')
    return (
      <textarea value={constraint}></textarea>
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
)(Display);




/***********************************
 * Controllers
 ***********************************/

// Component
class Controllers extends React.Component {
  // TODO: channelCount, echoCancellation
  render() {
    return (
      <div>
        <DeviceContainer />
        <FacingModeContainer />
        <RangeContainer type="width" min="100" max="200" step="10" />
        <RangeContainer type="height" min="100" max="200" step="10" />
        <RangeContainer type="volume" min="0" max="1" step="0.1" />
        <RangeContainer type="latency" min="0" max="100" step="10" />
        <RangeContainer type="frameRate" min="0" max="60" step="10" />
        <RangeContainer type="sampleRate" min="0" max="9600" step="1000" />
        <RangeContainer type="sampleSize" min="16" max="32" step="16" />
        <RangeContainer type="aspectRatio" min="0" max="3" step="0.1" />
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
)(Controllers);




/***********************************
 * App
 ***********************************/
class App extends React.Component {
  render() {
    return (
      <div>
        <ControllersContainer />
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
  devices: deviceReducer,
  constraint: constraintReducer,
});
const store = Redux.createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
