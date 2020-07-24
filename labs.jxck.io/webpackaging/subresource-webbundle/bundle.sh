# bundle as 1st party
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/a.js \
  -dir subresource/ \
  -headerOverride "Cache-Control: max-age=60" \
  -o bundle.wbn


# bundle as 3rd party
gen-bundle \
  -version b1 \
  -baseURL    https://example.com/webpackaging/subresource-webbundle/ \
  -primaryURL https://example.com/webpackaging/subresource-webbundle/a.js \
  -dir subresource/ \
  -headerOverride "Cache-Control: max-age=60" \
  -o bundle-3p.wbn
