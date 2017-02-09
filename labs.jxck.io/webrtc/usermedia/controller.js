const log = console.log.bind(console);

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
    log(state);
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

    log(this.state);

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
    let {name, value} = e.target;
    if (name === this.props.type) name = "value";
    this.setState(Object.assign(this.state, {[name]: parseInt(value)}))
  }

  render() {
    const {type, min, max, step} = this.props

    let input = <input type="number" placeholder={type} name={type} min={min} max={max} step={step} />;

    if (this.state.ideal) {
      input = (
        [
          <input type="number" name="min"  placeholder="min"   min={min} max={max} step={step} />,
          <input type="number" name={type} placeholder="ideal" min={min} max={max} step={step} />,
          <input type="number" name="max"  placeholder="max"   min={min} max={max} step={step} />,
        ]
      )
    }
    if (this.state.exact) {
      input = (
        <input type="number" name={type} placeholder="exact" min={min} max={max} step={step} />
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


/**
 * Controllers
 */
class Controllers extends React.Component {
  render() {
    return (
      <div>
        <Range type="width" min="100" max="200" step="10"/>
        <Range type="volume" min="0" max="1" step="0.1" />
        <FacingMode />
      </div>
    )
  }
}

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


/**
 * App
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <ControllersContainer />
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
});
const store = Redux.createStore(reducer)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
