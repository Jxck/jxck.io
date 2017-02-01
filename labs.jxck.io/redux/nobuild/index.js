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

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <div>
        <p>Clicked: {value} times</p>
        <div>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
          <button onClick={this.incrementIfOdd.bind(this)}>Increment if odd</button>
          <button onClick={this.incrementAsync.bind(this)}>Increment async</button>
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
    }
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

