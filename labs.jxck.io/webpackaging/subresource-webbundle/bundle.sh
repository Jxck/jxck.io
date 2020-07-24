# bundle as 1st party
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/subresource/a.js \
  -dir subresource/ \
  -headerOverride "Cache-Control: max-age=60" \
  -o bundle.wbn


# bundle as 3rd party
gen-bundle \
  -version b1 \
  -baseURL    https://example.com/ \
  -primaryURL https://example.com/a.js \
  -dir subresource/ \
  -headerOverride "Cache-Control: max-age=60" \
  -o bundle-3p.wbn


# profile card
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/profile-card/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/profile-card/profile-card.js \
  -dir profile-card/ \
  -headerOverride "Cache-Control: max-age=60" \
  -o profile-card.wbn
