console.log(`貴様、見ているな!!!
このサイトの技術的なまとめはこちらをどうぞ。
https://labs.jxck.io/blog
by Jxck
`)

if (window.ReportingObserver) {
  console.log('ReportingObserver');
  const observer = new ReportingObserver((reports, observer) => {
    console.log(reports)
    const URL = "https://report-uri.jxck.io/report-to.cgi"
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
    observer.takeRecords()
    observer.disconnect()
    // console.log(JSON.stringify(performance, " ", " "))
    console.log(performance)
  }, 3000)
}
