// Action Type
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const RESET     = 'RESET'


// Action Creator
const increment = () => {
  return { type: INCREMENT }
}

const decrement = () => {
  return { type: DECREMENT }
}

const reset = () => {
  return { type: RESET }
}


// Reducer
const counterReducer = (state = {value: 0}, action) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, value: state.value + 1}
    case DECREMENT:
      return {...state, value: state.value - 1}
    case RESET:
      return {...state, value: 0}
    default:
      return state
  }
}

// Component
const App: React.FC = () => {
  const useEffect = React.useEffect
  const dispatch  = ReactRedux.useDispatch()
  const value     = ReactRedux.useSelector((state) => state.value)

  const handleIncrement      = () => dispatch(increment())
  const handleDecrement      = () => dispatch(decrement())
  const handleIncrementAsync = () => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }

  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <div>
      <p>Clicked: {value} times</p>
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrementAsync}>async +</button>
        <button onClick={handleReset}>reset 0</button>
      </div>
    </div>
  )
}

const initialState = { value: 0 }
const store = Redux.createStore(counterReducer, initialState)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
