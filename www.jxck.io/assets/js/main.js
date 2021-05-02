console.log(`貴様、見ているな!!!
このサイトの技術的なまとめはこちらをどうぞ。
https://blog.jxck.io/README.md
by Jxck
`)

if (window.ReportingObserver) {
  console.log('ReportingObserver');
  const observer = new ReportingObserver((reports, observer) => {
    console.log(reports)
    const URL = "https://reporting.jxck.io/beacon"
    for (const report of reports) {
      navigator.sendBeacon(URL, JSON.stringify(report))
    }
  }, {buffered: true})
  observer.observe()
}


if (window.PerformanceObserver) {
  const performance = {}

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      switch(entry.entryType) {
        case "navigation":
          const connect  = entry.connectEnd                           // TCP establish
          const request  = entry.responseStart - entry.requestStart   // request time
          const response = entry.responseEnd   - entry.responseStart  // response time
          const dom      = entry.domComplete   - entry.responseEnd    // dom time
          const load     = entry.loadEventEnd  - entry.loadEventStart // load
          const duration = entry.duration                             // duration
          performance.navigation = {
            "0connect":  connect,
            "1request":  request,
            "2response": response,
            "3dom":      dom,
            "4load":     load,
            "5duration": duration,
          }
          break;
        case "largest-contentful-paint":
          performance.lcp = performance.lcp || []
          const lcp = {
            elem: entry.element.nodeName,
            time: entry.renderTime || entry.loadTime
          }
          performance.lcp.push(lcp);
          break;
        case "paint":
          performance[entry.name] = entry.startTime
          break;
        case "resource":
          performance.resource = performance.resource || {}
          performance.resource[entry.name] = entry.duration
          break;
        case "layout-shift":
          performance.layoutshift = performance.layoutshift || 0
          performance.layoutshift += entry.value
          break;
        case "longtask":
          performance.longtask = performance.longtask || 0
          performance.longtask += entry.duration
          break;
        case "first-input":
          console.log(entry)
          break;
        default:
          console.log(entry)
      }
    }
  })
  observer.observe({entryTypes: PerformanceObserver.supportedEntryTypes});

  setTimeout(() => {
    if (observer.takeRecords) observer.takeRecords() // safari unsupported
    observer.disconnect()
    // console.log(JSON.stringify(performance, " ", " "))
    console.log(performance)
  }, 3000)
}


if (navigator.serviceWorker) {
  (async () => {
    const scope  = '/entries/2016-01-27'
    const worker = await navigator.serviceWorker.register('/assets/js/workbox.js', {scope})
    console.debug('%cREGISTERED:', 'color: blue; font-weight: bold', worker);
  })()
}


document.addEventListener('DOMContentLoaded', () => {
  // AdSense
  (adsbygoogle = window.adsbygoogle || []).push({})
  console.log(adsbygoogle)

  // Prism.js
  document.querySelectorAll('pre code').forEach(($code) => {
    const $pre = $code.parentElement
    const lang = $pre.classList.item(0)
    if (lang == null) return
    const language = `language-${lang}`
    $code.classList.add(language)
    $pre.dataset.code = lang
    Prism.highlightAll()
  })
})
