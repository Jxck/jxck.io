console.log(`貴様、見ているな！！
このサイトの技術的なまとめはこちらをどうぞ。
https://labs.jxck.io/blog
by Jxck
`)

if (window.ReportingObserver) {
  (new ReportingObserver((reports, observer) => {
    reports.map((report) => {
      navigator.sendBeacon("https://report-uri.jxck.io/report-to.cgi", JSON.stringify(report))
    })
    console.log(reports)
  })).observe()
}
