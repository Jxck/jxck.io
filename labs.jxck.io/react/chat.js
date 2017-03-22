'use strict';
let log = console.log.bind(console);

class Controller extends React.Component {
  bindElem(elem) {
    if (elem === null) return
    this.elem = elem
  }

  onClick() {
    const message = this.elem.value
    this.props.onInput(message)
  }

  render() {
    return (
      <section>
        <h2>Controller</h2>
        <input name="message" type="text" ref={this.bindElem.bind(this)}/>
        <button onClick={this.onClick.bind(this)}>+</button>
      </section>
    )
  }
}

class Messages extends React.Component {
  render() {
    const {messages} = this.props
    const $li = messages.map((message) => <li>{message}</li>)
    return (
      <section>
        <h2>messages</h2>
        <ul>{$li}</ul>
      </section>
    )
  }
}

class Root extends React.Component {
  constructor() {
    super()
    this.elem = null
    this.state = {
      messages: [],
    }
  }

  onInput(message) {
    const messages = this.state.messages
    messages.push(message)
    const state = Object.assign(this.state, {messages})
    this.setState(state)
  }

  render() {
    const {name, value} = this.props
    const messages = this.state.messages
    return (
      <main>
        <Controller onInput={this.onInput.bind(this)} />
        <Messages messages={messages} />
      </main>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
