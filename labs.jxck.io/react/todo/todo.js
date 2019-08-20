'use strict';
let log = console.error.bind(console);

class Controller extends React.Component {

  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const message  = formData.get('message')
    this.props.onTODO(message)
  }

  render() {
    return (
      <section>
        <h2>TODO</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input name="message" type="text"/>
          <button type="submit">+</button>
        </form>
      </section>
    )
  }
}

class Messages extends React.Component {
  render() {
    const {messages} = this.props
    const $li = messages.map((message, key) => <li key={key}>{message}</li>)
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
    this.state = {
      messages: [],
    }
  }

  onTODO(message) {
    const messages = this.state.messages
    messages.push(message)
    const state = Object.assign(this.state, {messages})
    this.setState(state)
  }

  render() {
    const messages = this.state.messages
    return (
      <main>
        <Controller onTODO={this.onTODO.bind(this)} />
        <Messages messages={messages} />
      </main>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
