'use strict';
let log = console.log.bind(console);

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      count1: 0,
      count2: 0,
    }
  }

  onClick1() {
    const count1 = this.state.count1 + 1
    const state = Object.assign(this.state, {count1})
    this.setState(state)
    log('click', this.state)
  }

  onClick2() {
    const count2 = this.state.count2 + 1
    const state = Object.assign(this.state, {count2})
    this.setState(state)
    log('click', this.state)
  }

  render() {
    const {name, value} = this.props
    const {count1, count2} = this.state
    return (
      <main>
        <section>
          <h2>Counter</h2>
          <button onClick={this.onClick1.bind(this)}>+</button>
          <button onClick={this.onClick2.bind(this)}>+</button>
          <p>{count1} + {count2} = {count1+count2}</p>
        </section>
      </main>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.querySelector('#root')
)
