#!/usr/bin/env ruby
`rm *.gz`
`rm result`
`touch result`
(1..10)
  .map { |i| i * 10 }
  .each { |i|
    `time -v -a -o result zopfli --i#{i} -c loading-css-over-http2.html > loading-css-over-http2.html.#{i}.gz`
  }
