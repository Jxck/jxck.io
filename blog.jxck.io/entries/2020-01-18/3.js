const observer = new ReportingObserver((reports, observer) => {
  const message = JSON.stringify(reports)
  navigator.sendBeacon("https://report-uri.example.com", message)
});

observer.observe();
