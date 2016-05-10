# [nginx][cubicdaiya][mozaic.fm] ep18 Nginx

<audio preload="none" src="https://files.mozaic.fm/mozaic-ep18.mp3" controls></audio>

<ul class=info>
  <li>published_at: <time datetime=2015-06-01>2015-06-01</time>
  <li>guest: <a href=https://twitter.com/cubicdaiya>@cubicdaiya</a>
</ul>


## Theme

第 18 回のテーマは Nginx です。

今回は [@cubicdaiya](https://twitter.com/cubicdaiya) さんをお迎えして、 すっかり HTTP サーバのデファクトの地位につきつつある Nginx について、なぜ Nginx を選ぶのか、 Nginx から見た現在の Web にはどういう変化があるのか。 そして Nginx はこれからどうなっていくのか、それが Web にどんな変化をもたらすのかを議論しました。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

### Nginx を使い始めた理由(0:00~)

- [ngx-small-light](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fcubicdaiya%2Fngx_small_light&t=YzJmNDNkMGNlMGFiZTgzNjUwNmY2YWVmMGQ1NmY3M2U0NTI2NDE2MSx0UFVqYktDZw%3D%3D)
- [nginx-build](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fcubicdaiya%2Fnginx-build&t=YTYzYTJiNTliNGVlY2ZkM2RjNGRiZTAxOGRjODAwNTgwZDA3YmM3ZCx0UFVqYktDZw%3D%3D)
- [mruby](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fmruby%2Fmruby&t=Njg1NzUzYjBjMGU4M2Y0NTJmYTAxMmViOTk1NGQ4YjNlMDAwMzQ1Mix0UFVqYktDZw%3D%3D)
- [h2o](http://t.umblr.com/redirect?z=https%3A%2F%2Fh2o.examp1e.net&t=ZTgxNDBhMzJlYWI5NzZiOWZiMmNmNGRmY2RjYmJhODU0ZGFjMjk2Yyx0UFVqYktDZw%3D%3D)
- [Web+DB Press Vol.72](http://t.umblr.com/redirect?z=http%3A%2F%2Fgihyo.jp%2Fmagazine%2Fwdpress%2Farchive%2F2013%2Fvol72&t=ZDdjNmU0NTRlYTM1NGU0OGIxZTU2ZWU3MjVjZDIzOWUzODU5OWVjYSx0UFVqYktDZw%3D%3D)
- [WebP](http://t.umblr.com/redirect?z=https%3A%2F%2Fdevelopers.google.com%2Fspeed%2Fwebp%2F&t=ZGQwNjhiMWI2OTU3MjI1MTk4ZGY5ZTFjMzI5ZmRkMDgyNWEzY2Y1ZCx0UFVqYktDZw%3D%3D)


### Nginx のアーキテクチャ(7:26~)

- [Web+DB Press Vol.72](http://t.umblr.com/redirect?z=http%3A%2F%2Fgihyo.jp%2Fmagazine%2Fwdpress%2Farchive%2F2013%2Fvol72&t=ZDdjNmU0NTRlYTM1NGU0OGIxZTU2ZWU3MjVjZDIzOWUzODU5OWVjYSx0UFVqYktDZw%3D%3D)
- [C10K](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.hyuki.com%2Fyukiwiki%2Fwiki.cgi%3FTheC10kProblem&t=NGIzNWFhZmY2ZmI1NDNiNGRhNDI1ZDgwYWM1Y2Q0ZWQ0YjUyMWFmOSx0UFVqYktDZw%3D%3D)
- [epoll](http://t.umblr.com/redirect?z=http%3A%2F%2Fman7.org%2Flinux%2Fman-pages%2Fman7%2Fepoll.7.html&t=NzY4OGNjODI0MjcwODlhYTkwY2Y2NTdmNzc5MGNmOTQ3MGUxOGE2MCx0UFVqYktDZw%3D%3D)
- [kqueue](http://t.umblr.com/redirect?z=http%3A%2F%2F&t=Y2FhZGJkNWM4YTg2ZmJkYjQxMmYwZjRjZmQ2NmU5YWE0N2Q3NDMzYSx0UFVqYktDZw%3D%3D)
- [apache prefork mpm](http://t.umblr.com/redirect?z=http%3A%2F%2Fhttpd.apache.org%2Fdocs%2F2.4%2Fen%2Fmod%2Fprefork.html&t=YTdiZjMxYTM0ODIxYTlkOGM0NTM3ZDExMjUwZTIwYTdiOTM5MjQ5Myx0UFVqYktDZw%3D%3D)
- [apache event mpm](http://t.umblr.com/redirect?z=http%3A%2F%2Fhttpd.apache.org%2Fdocs%2F2.4%2Fen%2Fmod%2Fevent.html&t=ZjUwMGYwM2Y3MmMzYjU5NjA0MjVhMzI0ZmIzZTA2ZjlmODQyNTZjOSx0UFVqYktDZw%3D%3D)
- [WSGI](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.python.org%2Fdev%2Fpeps%2Fpep-0333%2F&t=N2IyMWZkZjU5OWIyODg4NDZiY2I1MzA5YWQxYTJhMDE1YjYwZGFhOCx0UFVqYktDZw%3D%3D)
- [PSGI](http://t.umblr.com/redirect?z=http%3A%2F%2Fplackperl.org%2F&t=MWRhOTE0ZmRhNTg2YTYzYzE0NWE1OGE2OThmYmQxN2RjMzg5NDczMyx0UFVqYktDZw%3D%3D)
- [Rack](http://t.umblr.com/redirect?z=http%3A%2F%2Frack.github.io%2F&t=MzlkZDdjZWFhMDYwOTNkYTZiZDJhNWNiOTBiMTMxODUxN2MxZjRjOCx0UFVqYktDZw%3D%3D)
- [Unicorn](http://t.umblr.com/redirect?z=http%3A%2F%2Funicorn.bogomips.org%2F&t=ZjNjN2YwM2YyNTlmMDZiNGIzZWEyMjQyNjAzZDlhNjZlNmY5ZDk0Zix0UFVqYktDZw%3D%3D)
- [Starman](http://t.umblr.com/redirect?z=http%3A%2F%2Fsearch.cpan.org%2F%7Emiyagawa%2FStarman-0.4013%2Flib%2FStarman.pm&t=MWRkMWI5MWVlNWI2MjY3MmQ0ZTliOTE1ZjllN2NlNWVhOGQ4NGM0MSx0UFVqYktDZw%3D%3D)


### なぜ Nginx をフロントに立てるのか(17:30~)

- [tmpfs](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.kernel.org%2Fdoc%2FDocumentation%2Ffilesystems%2Ftmpfs.txt&t=ZmQ5MmQ1MTZkMDRlNDE1ZjI3NGFlNDVmZWQ5ZTllZmQ4OTA3NTcwOSx0UFVqYktDZw%3D%3D)
- [.htaccess](http://t.umblr.com/redirect?z=https%3A%2F%2Fhttpd.apache.org%2Fdocs%2F2.4%2Fen%2Fhowto%2Fhtaccess.html&t=NGMwMGJlNGRmMGE3Y2VmZTk2ZGVhNDdlZjQ5ZTA0NWExZjJjYzg1Nyx0UFVqYktDZw%3D%3D)


### Nginx のスクリプティングモジュール (25:40~)

- [lua-nginx-module](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fopenresty%2Flua-nginx-module&t=OGM0OWI2Zjc1OWQzMTQwNjI0YzgyNGI0ODMzZjA5ZjljMjYxZTg2Yix0UFVqYktDZw%3D%3D)
- [ngx_mruby](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fmatsumoto-r%2Fngx_mruby&t=N2UzNjY4NzUwODhmZTcyNjcwMTZkNzQ2YTk0MjY3NWUxZmYwNTcyYSx0UFVqYktDZw%3D%3D)
- [Rial Time Bidding(RTB)](http://t.umblr.com/redirect?z=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FReal-time_bidding&t=OWRlNTQ0YmRiNjc4YjAyNDRjNTJlM2NmODg2ZTY1MjE5Mjg1Y2U1MCx0UFVqYktDZw%3D%3D)
- [location.capture()](http://t.umblr.com/redirect?z=http%3A%2F%2Fwiki.nginx.org%2FHttpLuaModule%23ngx.location.capture&t=ZDc3ODk0YTNkZDA0YmMwM2Q2ZTFkNTYxM2FkM2I4NjhiNzRjMzg0OCx0UFVqYktDZw%3D%3D)
- [OpenResty](http://t.umblr.com/redirect?z=http%3A%2F%2Fopenresty.org%2F&t=MzI5Yzc4NTUxNjAzNDFmZWRlOTJkNWRjMGMwNGUyZGFiYTI2MjYwMSx0UFVqYktDZw%3D%3D)
- [JavaScript を載せる](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.com%2Fblog%2Fnginx-open-source-reflecting-back-and-looking-ahead%2F&t=Y2RkMjVmMzYyODg5ZmM2YTI0MmViYzljZmVmODA5ZGMxNWRlYTNmMSx0UFVqYktDZw%3D%3D) という話


### H2O と Nginx(46:10~)

- [h2o](http://t.umblr.com/redirect?z=https%3A%2F%2Fh2o.examp1e.net%2F&t=YmJmMTlmMzcyMTg1MTRiZTQ1M2M0ZTU1ZmZmOTE1YzM5ZjAzN2E1MSx0UFVqYktDZw%3D%3D)
- [nghttp2](http://t.umblr.com/redirect?z=https%3A%2F%2Fnghttp2.org%2F&t=MmQ5ZGNkYjgwOWUxMDg2YThlNTFhZjRkNTIxYmVmNjc4ZTBlNTlhNyx0UFVqYktDZw%3D%3D)
- [nginx のパラメータチューニングと h2o](http://t.umblr.com/redirect?z=http%3A%2F%2Fqiita.com%2Fcubicdaiya%2Fitems%2F235777dc401ec419b14e&t=YzhiZWFkNjhkN2NjOGU4ZWNjMmU2YWMyODg3MzRiMmM5ODE5YWYzNyx0UFVqYktDZw%3D%3D)
- [open_file_cache](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_core_module.html%23open_file_cache&t=OWQzMjNiYTE0ODEwMGMxOGVkZjU2OWI3MmQ2NzlmNTUwM2M5MmFkZCx0UFVqYktDZw%3D%3D)
- [tcp_nopush](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_core_module.html%23tcp_nopush&t=MjUyMzJiMDE3M2QyZWFlZWQwYWUyMjg2NWJmOWFlMjA2YTUwY2M5OSx0UFVqYktDZw%3D%3D)


### Nginx の HTTP2 対応(49:40~)

- [http2(後日 RFC が出ました)](http://t.umblr.com/redirect?z=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc7540&t=ZDNkNjkxODUyYWYxOWZhMzk5ZWYxYjk5ZWRjMmUzZGFhOTA5YmQ2Yix0UFVqYktDZw%3D%3D)
- [hpack(後日 RFC が出ました)](http://t.umblr.com/redirect?z=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc7541&t=NjFlYzlkYTc4ODhjMTg5MmJjNGRkYmI2ZTY0ZmNmMGIxNTRlMzRlMSx0UFVqYktDZw%3D%3D)
- [How NGINX Plans to Support HTTP/2](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.com%2Fblog%2Fhow-nginx-plans-to-support-http2%2F&t=YWVhMDA1NTZiNDJlNWYwZTdhZDc5N2RjYzNlNmZmMjdkOTA4M2UwOCx0UFVqYktDZw%3D%3D)
- [ngrep](http://t.umblr.com/redirect?z=http%3A%2F%2Fngrep.sourceforge.net%2Fdownload.html&t=ZDQ3NGU5NWQ5OWRmMjE1ZWNhN2IxZGU4MmI1MTczOWMxM2IyZGQ2ZSx0UFVqYktDZw%3D%3D)
- [tcpdump](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.tcpdump.org%2F&t=NDY2Mjk1ODEzZDc3OWIwNGJjNjMzOWFkMjA3YTEwZTRmZTkyYTA4OSx0UFVqYktDZw%3D%3D)
- [grpc](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fgrpc%2Fgrpc&t=ODM5YzRhNzhkNzBhMjQyZTliYzI1NGQ5YTNjYjUxMGFmY2Y3M2Q3MCx0UFVqYktDZw%3D%3D)


### TLS 前提になっていく感じどうなのか(56:10~)

- [HTTPS 化する Web をどう考えるか(書いたのは収録後です)](http://t.umblr.com/redirect?z=http%3A%2F%2Fjxck.hatenablog.com%2Fentry%2Fweb-over-https&t=ZGZjMDNkNWU3MzVmMDI5NDMzMWI4NDI2NDI3YTYzYWE4Zjk3YjUxZix0UFVqYktDZw%3D%3D)


### QUIC はどうか?(58:10~)

- [QUIC](http://t.umblr.com/redirect?z=http%3A%2F%2Fblog.chromium.org%2F2013%2F06%2Fexperimenting-with-quic.html&t=MWQ0Y2JmMTFkZDFhZWFhOTczN2U4Y2UyZThjYTY4ZmZjZjRlNmVlOSx0UFVqYktDZw%3D%3D)
- **Google はインターネットを fork しようとしている**


### Nginx 1.9 の新機能(1:05:10~)

- [Nginx マイルストーン 1.9](http://t.umblr.com/redirect?z=http%3A%2F%2Ftrac.nginx.org%2Fnginx%2Fmilestone%2F1.9&t=NjkxYWU2NTdlODUyNWFmYjA2ZjUxOGQ2NmJmMDRhNWEyMWZmMTA5MSx0UFVqYktDZw%3D%3D)
- [Nginx Plus](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.com%2Fproducts%2F&t=YzgzMzBkYmRmZDU2ZGY4NGY5MDJmOTYzOGM4NmZlMmMzOGNlMjRhMCx0UFVqYktDZw%3D%3D)
- [ngx_http_stub_status_module](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_stub_status_module.html&t=MjBkMjc5OGY0M2FiOGYyYjNmYWVjZTQzMWM3M2Q5OTNkMDMxMGI2MSx0UFVqYktDZw%3D%3D)
- (収録語 Upstream 一覧の動的更新を cubicdaiya さんがモジュールで公開されました [ngx_dynamic_upstream](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fcubicdaiya%2Fngx_dynamic_upstream&t=ZjNlNjg0NmQ4NTNiM2M1MWNlOWYxN2Y3Y2E2YTY1N2VhNzMwNGVmOSx0UFVqYktDZw%3D%3D))


### tengine (1:42:30~)

- [tengine](http://t.umblr.com/redirect?z=http%3A%2F%2Ftengine.taobao.org%2F&t=NjIwODkwYjcyNGYwZmFhNWQxZjIzM2QwOWQ0YjEyMTBmODQ2OGUzNSx0UFVqYktDZw%3D%3D)
- (SO_REUSEPORT サポートは [もうすぐ](http://t.umblr.com/redirect?z=http%3A%2F%2Fhg.nginx.org%2Fnginx%2Frev%2F4f6efabcb09b&t=NWEzNTUyYzI1MjZhMjU2MTRmYjk4ZmQ3ZjA0MjVhYzExYWY0NmZjNSx0UFVqYktDZw%3D%3D) 入りそうです)


### Nginx 1.8 リリース (1:17:10~)

- [CHANGES-1.8](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2FCHANGES-1.8&t=OTdjOGUwNDMzZmVkNWMwYTA4MzgwYzc5YmFhNjhiNGE1YThhMmM1ZCx0UFVqYktDZw%3D%3D)
- [proxy_request_buffering](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_proxy_module.html%23proxy_request_buffering&t=NTQyMjI1MDdmZGUwNzE4YjUzZmIwYWQzYmI5N2IwOGJiMGY3MTJiZix0UFVqYktDZw%3D%3D)
- [AIO](http://t.umblr.com/redirect?z=http%3A%2F%2Fman7.org%2Flinux%2Fman-pages%2Fman7%2Faio.7.html&t=OWU3ZGYwOTc5NzljMzUwZTg2YTI2YWM0YzBkNWI5ZWQ1MjMwNDcyMyx0UFVqYktDZw%3D%3D)
- [HLS(http live streaming) module](http://t.umblr.com/redirect?z=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_hls_module.html&t=NzExNzdlNDhlYWYwMzRhZmEzNWM1ODRhOTY5MWY3NDg2NTAyNjg3NCx0UFVqYktDZw%3D%3D)


### これからの HTTP Server と Nginx(1:21:10~)

- [libh2o](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fh2o%2Fh2o%2Ftree%2Fmaster%2Fexamples%2Flibh2o&t=OGUwM2RkNTJkOWQ0YTBlNzVkM2FmNmE0YTU5NzE0NGI4ZjI0NWY0OSx0UFVqYktDZw%3D%3D)
- [libnghttp2](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Ftatsuhiro-t%2Fnghttp2%2Ftree%2Fmaster%2Flib&t=ZjcxZjVjOTdhMTg2ZGJhYzkxZjY4NWQxZWZlZTEwMmVlYjk0MWU1Zix0UFVqYktDZw%3D%3D)
