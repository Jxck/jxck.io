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

      switch(report.type) {
        case "deprecation":
          r.body = {
            id:                 report.body.id,
            anticipatedRemoval: report.body.anticipatedRemoval,
            message:            report.body.message,
            sourceFile:         report.body.sourceFile,
            lineNumber:         report.body.lineNumber,
            columnNumber:       report.body.columnNumber,
          }
          break;
        case "intervention":
          r.body = {
            id:           report.body.id,
            message:      report.body.message,
            sourceFile:   report.body.sourceFile,
            lineNumber:   report.body.lineNumber,
            columnNumber: report.body.columnNumber,
          }
          break;
        case "crash":
          r.body = {
            id:     report.body.id,
            reason: report.body.reason,
          }
          break;
      }

      const URL = "https://report-uri.jxck.io/report-to.cgi"
      navigator.sendBeacon(URL, JSON.stringify(r))
    }
  }, {buffered: true})

  observer.observe()
}
