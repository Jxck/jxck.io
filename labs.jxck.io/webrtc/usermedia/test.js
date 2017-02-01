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


const loading = () => {
  return {
    type: 'LOADING'
  }
}

const fetching = (dispatch) => {
  dispatch(loading());
  fetch('http://httpbin.org/status/200').then((res) => {
    console.log(res);
    dispatch({
      type: 'FETCH_SUCCESS',
      value: res.status
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_FAIL',
      err: err
    });
  });
}

// Reducer
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        value: action.value,
        loading: false
      })
    case 'FETCH_FAIL':
      console.error(action.err);
      return Object.assign({}, state, {
        loading: false
      })
    case 'LOADING':
      return Object.assign({}, state, {
        loading: true
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


class Counter extends React.Component {
  onStart() {
    if (this.props.id) {
      return console.log('starting');
    }
    this.props.onStart();
  }

  render() {
    const { value, onFetch, loading } = this.props
    const nowloading = loading ? <strong>now loading</strong>: ''
    return (
      <div>
        <DeviceContainer />
        <p>Clicked: {value} times</p>
        { nowloading }
        <div>
          <button onClick={onFetch}>Fetch</button>
        </div>
      </div>
    )
  }
}

// Container
const AppContainer = ReactRedux.connect(
  (state) => {
    return {
      value: state.counter.value,
      loading: state.counter.loading
    }
  },
  (dispatch) => {
    return {
      onFetch(status) {
        fetching(dispatch)
      }
    }
  }
)(Counter);


const reducer = Redux.combineReducers({
  counter: counterReducer,
  device: deviceReducer,
});
const store = Redux.createStore(reducer)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
