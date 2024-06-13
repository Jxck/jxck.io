# [chromium] URL.parse を Chromium で Ship するまで

## Intro

Chrome 126 で URL.parse が ship された。

Chromium にコントリビュートしたことは何回かあったが、単体機能を Ship したのは初めてだったので、流れを残す。


## URL.parse

以下で仕様が追加された。

- Consider adding non-throwing URL.parse(input, base) · Issue #372 · whatwg/url
  - https://github.com/whatwg/url/issues/372

- Add URL.parse() by annevk · Pull Request #825 · whatwg/url
  - https://github.com/whatwg/url/pull/825

仕様

- URL Standard
  - https://url.spec.whatwg.org/#dom-url-parse


Chromium でこれの担当がまだ浮いてた。

- Implement URL.parse() [331041242] - Chromium
  - https://issues.chromium.org/u/0/issues/331041242

レビュー


- Implement URL.parse() (5414853) · Gerrit Code Review
  - https://chromium-review.googlesource.com/c/chromium/src/+/5414853


Intent to Ship

- Intent to Ship: URL.parse()
  - https://groups.google.com/u/0/a/chromium.org/g/blink-dev/c/G070zUd0e4c


Firefox

- 1887611 - Implement URL.parse()
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1887611
- Intent to prototype & ship: URL.parse()
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3QgJqDYpEwA/m/4n1pJEtqAAAJ


Webkit

- Implement URL.parse() by annevk · Pull Request #26403 · WebKit/WebKit
  - https://github.com/WebKit/WebKit/pull/26403