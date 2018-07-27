# [nginx][cubicdaiya][mozaic.fm] ep18 Nginx

## Info

audio: https://files.mozaic.fm/mozaic-ep18.mp3

- published_at: 2015-06-01
- guest: [@cubicdaiya](https://twitter.com/cubicdaiya)


## Theme

第 18 回のテーマは Nginx です。

今回は [@cubicdaiya](https://twitter.com/cubicdaiya) さんをお迎えして、 すっかり HTTP サーバのデファクトの地位につきつつある Nginx について、なぜ Nginx を選ぶのか、 Nginx から見た現在の Web にはどういう変化があるのか。 そして Nginx はこれからどうなっていくのか、それが Web にどんな変化をもたらすのかを議論しました。


## Show Note


### Nginx を使い始めた理由(0:00~)

- [ngx-small-light](https://github.com/cubicdaiya/ngx_small_light)
- [nginx-build](https://github.com/cubicdaiya/nginx-build)
- [mruby](https://github.com/mruby/mruby)
- [h2o](https://h2o.examp1e.net)
- [Web+DB Press Vol.72](http://gihyo.jp/magazine/wdpress/archive/2013/vol72)
- [WebP](https://developers.google.com/speed/webp/)


### Nginx のアーキテクチャ(7:26~)

- [Web+DB Press Vol.72](http://gihyo.jp/magazine/wdpress/archive/2013/vol72)
- [C10K](http://www.hyuki.com/yukiwiki/wiki.cgi%3FTheC10kProblem)
- [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html)
- [kqueue](http://)
- [apache prefork mpm](http://httpd.apache.org/docs/2.4/en/mod/prefork.html)
- [apache event mpm](http://httpd.apache.org/docs/2.4/en/mod/event.html)
- [WSGI](https://www.python.org/dev/peps/pep-0333/)
- [PSGI](http://plackperl.org/)
- [Rack](http://rack.github.io/)
- [Unicorn](http://unicorn.bogomips.org/)
- [Starman](http://search.cpan.org/%7Emiyagawa/Starman-0.4013/lib/Starman.pm)


### なぜ Nginx をフロントに立てるのか(17:30~)

- [tmpfs](https://www.kernel.org/doc/Documentation/filesystems/tmpfs.txt)
- [.htaccess](https://httpd.apache.org/docs/2.4/en/howto/htaccess.html)


### Nginx のスクリプティングモジュール (25:40~)

- [lua-nginx-module](https://github.com/openresty/lua-nginx-module)
- [ngx_mruby](https://github.com/matsumoto-r/ngx_mruby)
- [Rial Time Bidding(RTB)](http://en.wikipedia.org/wiki/Real-time_bidding)
- [location.capture()](http://wiki.nginx.org/HttpLuaModule%23ngx.location.capture)
- [OpenResty](http://openresty.org/)
- [JavaScript を載せる](http://nginx.com/blog/nginx-open-source-reflecting-back-and-looking-ahead/) という話


### H2O と Nginx(46:10~)

- [h2o](https://h2o.examp1e.net/)
- [nghttp2](https://nghttp2.org/)
- [nginx のパラメータチューニングと h2o](http://qiita.com/cubicdaiya/items/235777dc401ec419b14e)
- [open_file_cache](http://nginx.org/en/docs/http/ngx_http_core_module.html%23open_file_cache)
- [tcp_nopush](http://nginx.org/en/docs/http/ngx_http_core_module.html%23tcp_nopush)


### Nginx の HTTP2 対応(49:40~)

- [http2(後日 RFC が出ました)](https://tools.ietf.org/html/rfc7540)
- [hpack(後日 RFC が出ました)](https://tools.ietf.org/html/rfc7541)
- [How NGINX Plans to Support HTTP/2](http://nginx.com/blog/how-nginx-plans-to-support-http2/)
- [ngrep](http://ngrep.sourceforge.net/download.html)
- [tcpdump](http://www.tcpdump.org/)
- [grpc](https://github.com/grpc/grpc)


### TLS 前提になっていく感じどうなのか(56:10~)

- [HTTPS 化する Web をどう考えるか(書いたのは収録後です)](http://jxck.hatenablog.com/entry/web-over-https)


### QUIC はどうか?(58:10~)

- [QUIC](http://blog.chromium.org/2013/06/experimenting-with-quic.html)
- *Google はインターネットを fork しようとしている*


### Nginx 1.9 の新機能(1:05:10~)

- [Nginx マイルストーン 1.9](http://trac.nginx.org/nginx/milestone/1.9)
- [Nginx Plus](http://nginx.com/products/)
- [ngx_http_stub_status_module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html)
- (収録語 Upstream 一覧の動的更新を cubicdaiya さんがモジュールで公開されました [ngx_dynamic_upstream](https://github.com/cubicdaiya/ngx_dynamic_upstream))


### tengine (1:42:30~)

- [tengine](http://tengine.taobao.org/)
- (SO_REUSEPORT サポートは [もうすぐ](http://hg.nginx.org/nginx/rev/4f6efabcb09b) 入りそうです)


### Nginx 1.8 リリース (1:17:10~)

- [CHANGES-1.8](http://nginx.org/en/CHANGES-1.8)
- [proxy_request_buffering](http://nginx.org/en/docs/http/ngx_http_proxy_module.html%23proxy_request_buffering)
- [AIO](http://man7.org/linux/man-pages/man7/aio.7.html)
- [HLS(http live streaming) module](http://nginx.org/en/docs/http/ngx_http_hls_module.html)


### これからの HTTP Server と Nginx(1:21:10~)

- [libh2o](https://github.com/h2o/h2o/tree/master/examples/libh2o)
- [libnghttp2](https://github.com/tatsuhiro-t/nghttp2/tree/master/lib)
