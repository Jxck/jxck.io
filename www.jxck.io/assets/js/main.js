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

/**
 * Ruby でビルドして version を更新するので
 * フォーマットを崩さない
 */
const precache =
/*precache-build.rb*/
[
  "/assets/js/main.js?210426_190619",
  "/assets/js/prism.js?210115_215132",
  "/assets/js/ga.js?210325_165821",
  "/assets/css/archive.css?200907_002254",
  "/assets/css/article.css?201223_011702",
  "/assets/css/body.css?210426_190618",
  "/assets/css/footer.css?201223_011131",
  "/assets/css/header.css?210426_190618",
  "/assets/css/index.css?210325_220155",
  "/assets/css/info.css?201223_011131",
  "/assets/css/main.css?201223_011131",
  "/assets/css/markdown.css?201218_145648",
  "/assets/css/pre.css?210116_195125",
  "/assets/css/search.css?201223_011131",
  "/assets/css/table.css?201223_011131",
  "/assets/img/blog.svg?160301_215351",
  "/assets/img/search.svg?190421_130410",
  "/assets/img/rss.svg?160227_124312",
  "/assets/img/humans.svg?160831_002319",
  "/assets/img/jxck.svg?190123_200004",
  "/assets/img/amp.svg?181110_002524",
  "/assets/img/up.svg?160831_002319",
  "/assets/img/jxck.png?210331_115006",
]
/*precache-build.rb*/

console.log(precache)
