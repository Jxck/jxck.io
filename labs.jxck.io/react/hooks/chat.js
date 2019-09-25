'use strict';
console.clear()

const render    = ReactDOM.render
const useState  = React.useState
const useEffect = React.useEffect

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'react-demo'])

function SocketChat({socket}) {
  const [messages, setMessages] = useState([])
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    socket.addEventListener('open', (e) => {
      console.log('socket.open')
      setDisabled(false)
    })

    return () => {
      console.log('socket.close')
      socket.close()
    }
  }, [])

  useEffect(() => {
    console.log('use effect')
    function onMessage(e) {
      setMessages((messages)  => [...messages, e.data])
    }
    socket.addEventListener('message', onMessage)
    return () => {
      console.log('socket.removeEventListener')
      socket.removeEventListener('message', onMessage)
    }
  }, [])

  function onSubmit(e) {
    console.log('submit')
    e.preventDefault()
    const formData = new FormData(e.target)
    const message  = formData.get("message")
    socket.send(message)
  }

  return (
    <div>
      <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>
      <form onSubmit={onSubmit}>
        <input type="text" name="message" defaultValue="deadbeef" />
        <button type="submit" disabled={disabled}>send</button>
      </form>
    </div>
  )
}

//########################################
render(
  <SocketChat socket={ws}/>,
  document.getElementById('root')
);
//########################################
