// Action
const enumDevice = (dispatch) => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    console.log(devices);
    dispatch({
      type: 'ENUM_DEVICE',
      devices: devices,
    });
  });
}

const deviceReducer = (state = {devices: []}, action) => {
  console.log(state, action);
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
  render() {
    const {onEnumDevice, devices} = this.props
    console.log(devices);
    const li = devices.map((d) => {
      return <li>{d.kind}</li>
    });
    return (
      <div>
        <ul>{li}</ul>
        <button onClick={onEnumDevice}>Device</button>
      </div>
    )
  }
}

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


// Container
class App extends React.Component {
  render() {
    return (
      <div>
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
