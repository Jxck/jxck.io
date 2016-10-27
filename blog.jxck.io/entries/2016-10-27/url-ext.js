const URL = require('url').URL;

// 日本語ドメイン
const jp = new URL('https://じゃっく.jp');
console.log(jp);
// URL {
//   href: https://xn--y8jr7a5i.jp/
//   protocol: https:
//   hostname: xn--y8jr7a5i.jp
//   pathname: /
// }

// IPv6
const ipv6 = new URL('https://[::1]/');
console.log(ipv6);
// URL {
//   href: https://[::1]/
//   protocol: https:
//   hostname: [::1]
//   pathname: /
// }

// 日本語
const ja = new URL('https://example.com/ぱす?きー=ばりゅー');
console.log(ja);
// URL {
//   href: https://example.com/%E3%81%B1%E3%81%99?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
//   protocol: https:
//   hostname: example.com
//   pathname: /%E3%81%B1%E3%81%99
//   search: ?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
// }
