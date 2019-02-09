console.log(`貴様、見ているな！！
このサイトの技術的なまとめはこちらをどうぞ。
https://labs.jxck.io/blog
by Jxck
`)

if (window.ReportingObserver) {
  console.log('ReportingObserver');
  const observer = new ReportingObserver((reports, observer) => {
    for (const report of reports) {
      console.log(report.type, report.url, report.body)

      const r = {
        type: report.type,
        url:  report.url,
        body: {},
      }

      for (let k in report.body) {
        r.body[k] = report.body[k]
      }

      console.log(r)

      const URL = "https://report-uri.jxck.io/report-to.cgi"
      navigator.sendBeacon(URL, JSON.stringify(r))
    }
  }, {buffered: true})

  observer.observe()
}
