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
 * Constraints
 ***********************************/

// Action
const getSupportedConstraints = (dispatch) => {
  const keys = navigator.mediaDevices.getSupportedConstraints();
  let supported = Object.keys(keys).sort((a, b) => {
    if (a.startsWith('moz')) return 1;
    return (a.length > b.length) ? 1 : -1;
  });
  console.log(supported);
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
    const { supported } = this.props;
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
  constraints: constraintsReducer,
});
const store = Redux.createStore(reducer)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
