// Action
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

// Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        value: state.value + 1
      })
    case 'DECREMENT':
      return Object.assign({}, state, {
        value: state.value - 1
      })
    default:
      return state
  }
}


// Component
class Counter extends React.Component {
  static get propTypes() {
    return {
      value: PropTypes.number.isRequired,
      onIncrement: PropTypes.func.isRequired,
      onDecrement: PropTypes.func.isRequired,
    }
  }

  render() {
    const { value, onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync } = this.props
    return (
      <div>
        <p>Clicked: {value} times</p>
        <div>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrementIfOdd.bind(this, value)}>Increment if odd</button>
          <button onClick={onIncrementAsync}>Increment async</button>
        </div>
      </div>
    )
  }
}

// Container
function mapStateToProps(state) {
  return { value: state.value }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement() {
      dispatch(increment())
    },
    onDecrement() {
      dispatch(decrement())
    },
    onIncrementIfOdd(value) {
      if (value % 2 == 0) return
      dispatch(increment())
    },
    onIncrementAsync() {
      setTimeout(() => {
        dispatch(increment())
      }, 1000)
    },
  }
}

const AppContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);


const initialState = { value: 0 };
const store = Redux.createStore(counter, initialState)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
