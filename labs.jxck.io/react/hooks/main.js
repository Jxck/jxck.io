'use strict';

function useFileFetch(url) {
  const [progress, setProgress] = React.useState({current:0, total:1, done: false})
  const controller              = React.useRef()

  React.useEffect(() => {
    async function fetching() {
      try {
        controller.current = new AbortController()
        const signal = controller.current.signal
        const res    = await fetch(url, {signal})
        const reader = res.body.getReader()

        setProgress((prev) => {
          return {...prev, total: parseInt(res.headers.get('content-length'))}
        })

        while(true) {
          const result = await reader.read()
          if (result.done) return setProgress((prev) => {
            return {...prev, done: true}
          })
          const length = result.value.length
          setProgress((prev) => {
            return {...prev, current: prev.current + length}
          })
        }
      } catch(err) {
        setProgress((prev) => {
          return {...prev, done: err}
        })
      }
    }

    if (url) {
      fetching()
    }

    return () => {
      if (controller.current) controller.current.abort()
    }
  }, [url])

  return [progress, controller]
}

const FileFetch: React.FC = () => {
  const [url, setURL] = React.useState(null)
  const [progress, controller] = useFileFetch(url)
  const now = Math.floor((progress.current/progress.total)*100)
  console.log(now)

  const ep00 = "./mozaic-ep0.mp3"
  const ep61 = "./mozaic-ep61.mp3"

  const onStart = (e) => {
    e.preventDefault();
    setURL(e.target.href)
  }
  const onAbort = (e) => {
    controller.current.abort()
  }

  return (
    <div className="App">
      <p>{now}%:{progress.done.toString()}</p>
      <progress max={progress.total} value={progress.current}></progress>
      <ul>
        <li><a href={ep61} onClick={onStart}>{ep61}</a></li>
        <li><a href={ep00} onClick={onStart}>{ep00}</a></li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <FileFetch />,
  document.getElementById('root')
)
