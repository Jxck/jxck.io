# [tag] DNS 設定の見直し

## Intro

- hosting
  - A
  - AAAA
  - CNAME
- mail
  - MX
  - SPF
- name server
  - NS
  - SOA
- security
  - CAA
    - CA を許可する
  - DS
    - 子ゾーンの DNSKEY
  - PTR
    - 逆引き
  - SSHFP
    - SSH pub key
  - TLSA
    - CA 証明書なしに TLS
  - DNSKEY
    - 安全な転送のために、他のオペレーターから取得される DNSSEC キー。このレコード セットタイプを追加できるのは、転送状態の DNSSEC 対応ゾーンのみです。
  - IPSECKEY
- Other
  - NAPTR
   - Uniform Resource Name のマッピングに使用する NAPTR(Naming Authority Pointer)ルール。
  - SRV
    - 特定のサービスのサーバーの場所(ホスト名とポート番号)を指定するデータ。詳細については、RFC 2782をご覧ください。
  - HTTPS
  - SVCB
  - TXT


## HTTPS/SVCB

### 検証方法

```
jxck$ SSLKEYLOGFILE=/tmp/SSLKEYLOGFILE.log /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-features="UseDnsHttpsSvcb<DnsHttpsSvcbSchemeUpgrade.ForcedOn_UseDnsHttpsSvcb:UseDnsHttpsSvcbEnableInsecure/true/UseDnsHttpsSvcbHttpUpgrade/true/UseDnsHttpsSvcbExtraTimeAbsolute/500ms/UseDnsHttpsSvcbExtraTimePercent/100"\n
```

### HSTS



- Intent to Ship: HTTP->HTTPS redirect for HTTPS DNS records
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_wp024Ixvfk/m/-n4QtKQmBgAJ



redirect せずに DNS Query の段階で HTTPS の提供をアドバタイズする。

- HTTPS レコードでエイリアスモードを提供
- 未対応クライアントのために A/AAAA も提供


```
jxck.io
  IN HTTPS 0 https.jxck.io.
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134

https.jxck.io.
  IN HTTPS 1 .
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134
```



これでもいける?

```
jxck.io
  IN HTTPS 0 .
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134
```




これで preload hsts してないドメインでも最初から HTTPS できる。


### IP Hints

二回レコードを引く必要があるため、 hint で IP を提供し RTT をへらす


```
jxck.io
  IN HTTPS 0 https.jxck.io. ipv4hint=160.16.91.134 ipv6hint=2001:e42:102:1521:160:16:91:134
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134

https.jxck.io. IN HTTPS 1 .
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134
```


### HTTP2

- HTTPS レコードでサービスモードを提供
- パラメータで alpn=h2 をアドバタイズ

```
jxck.io
  IN HTTPS 1 h2.jxck.io. alpn=h2
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134

h2.jxck.io.
  IN HTTPS 1 .
  IN A 160.16.91.134
  IN AAAA 2001:e42:102:1521:160:16:91:134
```


最初から HTTP2 前提で接続


### ECH

- Intent to Prototype: TLS Encrypted Client Hello (ECH)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YEo4LqB7nWI/m/t1IkW35rAwAJ

- https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-13
- https://datatracker.ietf.org/doc/html/draft-ietf-dnsop-svcb-https-08




## TLSA

CA 証明書が入った証明書ストアベースでの PKI を用いず、 DNSSEC でレコードが改ざんされてないことをベースにした HTTPS が実現できる。
つまり、オレオレ証明書でよくなる。

ブラウザでは対応してないっぽい。

## DNSKEY

## SRV


## SSHFP





## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other

