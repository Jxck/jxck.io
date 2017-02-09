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
      //constraint: state.constraint.devices,
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

// Action
const selectFacing = (dispatch, facingMode) => {
  const type = 'SELECT_FACING';
  const {mode, ideal, exact} = facingMode;

  if (mode === "") {
    return dispatch({type});
  }
  if (exact) {
    return dispatch({type, facingMode : { exact : mode } });
  }
  if (ideal) {
    return dispatch({type, facingMode : { ideal: mode } });
  }

  return dispatch({type, facingMode: mode});
}

class FacingMode extends React.Component {
  onChange() {
    this.props.onSelectFacing({
      mode:  this.mode.value,
      ideal: this.ideal.checked,
      exact: this.exact.checked,
    });
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
      <div onChange={this.onChange.bind(this)}>
        <div>
          <label htmlFor={mode}>{mode}</label>
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
      constraint: state.constraint,
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








// Constraint Reducer
const constraintReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_DEVICE':
      const {name, value} = action.device
      return Object.assign({}, state, {[name]: value});
    case 'SELECT_FACING':
      const facingMode = action.facingMode;
      return Object.assign({}, state, {facingMode});
    default:
      return state
  }
}





















// class Range extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       ideal: false,
//       exact: false,
//       value: null,
//       min:   null,
//       max:   null,
//     }
//   }
// 
//   get constraints() {
//     const type = this.props.type;
//     const {ideal, exact, value, min, max} = this.state;
// 
//     if (exact) {
//       if (value === null) return null
//       return { [type] : { exact : value }}
//     }
// 
//     if (ideal) {
//       if (value === null && min === null && max === null) return null
//       let result = {}
//       if (value) result.ideal = value
//       if (min) result.min = min
//       if (max) result.max = max
//       return { [type]: result }
//     }
// 
//     if (value === null) return null
// 
//     return { [type]: value };
//   }
// 
//   onExact(e) {
//     this.setState(Object.assign(this.state, {exact: e.target.checked}))
//   }
// 
//   onIdeal(e) {
//     this.setState(Object.assign(this.state, {ideal: e.target.checked}))
//   }
// 
//   onChange(e) {
//     let {name, value} = e.target;
//     if (name === this.props.type) name = "value";
//     this.setState(Object.assign(this.state, {[name]: parseInt(value)}))
//   }
// 
//   render() {
//     const {type, min, max, step} = this.props
// 
//     let input = <input type="number" placeholder={type} name={type} min={min} max={max} step={step} />;
// 
//     if (this.state.ideal) {
//       input = (
//         [
//           <input type="number" name="min"  placeholder="min"   min={min} max={max} step={step} />,
//           <input type="number" name={type} placeholder="ideal" min={min} max={max} step={step} />,
//           <input type="number" name="max"  placeholder="max"   min={min} max={max} step={step} />,
//         ]
//       )
//     }
//     if (this.state.exact) {
//       input = (
//         <input type="number" name={type} placeholder="exact" min={min} max={max} step={step} />
//       )
//     }
//     return (
//       <div>
//         <div onChange={this.onChange.bind(this)}>
//           {input}
//         </div>
//         <input type="checkbox" name="ideal" onChange={this.onIdeal.bind(this)}/>
//         <input type="checkbox" name="exact" onChange={this.onExact.bind(this)}/>
//         <div>{JSON.stringify(this.constraints)}</div>
//       </div>
//     )
//   }
// }



class Display extends React.Component {
  render() {
    const constraint = JSON.stringify(this.props.constraint, ' ', ' ')
    return (
      <textarea value={constraint}></textarea>
    )
  }
}

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




/**
 * Controllers
 */
class Controllers extends React.Component {

  // <Range type="width" min="100" max="200" step="10"/>
  // <Range type="volume" min="0" max="1" step="0.1" />
  render() {
    return (
      <div>
        <DeviceContainer />
        <FacingModeContainer />
        <DisplayContainer />
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
