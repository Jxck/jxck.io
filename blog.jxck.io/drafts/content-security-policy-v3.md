# [csp][security] CSPv3 対応と report-to への移行

## Intro

CSPv3




- Fetch Directives
  - child-src
    - **deprecated**, frame-src, worker-src を使用
  - connect-src
    - fetch, xhr, sse, beacon, ws などの接続先
  - default-src
    - Fetch directive のデフォルト
  - font-src
    - font の取得先
  - frame-src
    - frame の読込先
  - img-src
    - image の読込先
  - manifest-src
    - manifest.json の読込先
  - media-src
    - video/audio, vtt の読込先
  - prefetch-src
    - prefetch/prerender 先
  - object-src
    - plugin の読込先
  - script-src
    - JS 読込先
  - style-src
    - CSS 読込先
  - worker-src
    - worker/sharedworker/serviceworker の読込先

- Document Directives
  - base-uri
    - `<base>` で使う URI
  - plugin-types
    - application/pdf など
  - sandbox
    - sandbox policy
  - disown-opener
    - **WIP**

- Navigation Directives
  - form-action
    - form が submit できる URL
  - frame-ancestors
    - `frame`, `iframe`, `object`, `embed`, `applet` の URL
  - navigation-to
    - **WIP** `a`, `form`, `window.location`, `window.open` で遷移できる URL

- Reporting Directives
  - report-uri
    - **deprecated**
  - report-to
    - Report URI の送り先
