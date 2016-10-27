const URL = require('url').URL;

const u = new URL('https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main');
console.log(u);
// URL {
//   href: https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main
//   protocol: https:
//   username: jxck
//   password: --------
//   hostname: blog.jxck.io
//   pathname: /path/to/entry
//   search: ?log=true&lang=ja
//   hash: #main
// }
