rm **/*.wbn

# sub1
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/sub1/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/sub1/sub1-a.js \
  -dir sub1/ \
  -o ./bundle/sub1.wbn

# sub2
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/sub2/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/sub2/sub2-a.js \
  -dir sub2/ \
  -o ./bundle/sub2.wbn

# sub3 = sub1 + sub2
gen-bundle \
  -version b1 \
  -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/bundle/ \
  -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/bundle/sub1.wbn \
  -dir bundle/ \
  -o sub3.wbn
