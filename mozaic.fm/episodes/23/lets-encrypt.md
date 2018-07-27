# [let's encrypt][pki][ca][security][mozaic.fm] ep23 Let's Encrypt

## Info

audio: https://files.mozaic.fm/mozaic-ep23.mp3

- published_at: 2016-09-06
- guest: 先生(匿名)


## Theme

第 23 回のテーマは Let's Encrypt です。

今回は、匿名のゲストとして PKI のスペシャリスト「*先生*」をお迎えして、 HTTPS 化推進の要である Let's Encrypt をきっかけに、近年多発している「CA は信用できるのか問題」も踏まえながら、今 CA を含めた PKI の世界で 「*今何がおこっているのか*」と「*これからどうなっていくのか*」について議論しました。

*先生* は、エピソードの最後におっしゃっていたように、この mozaic.fm の主旨に賛同して、色々調整の結果匿名と言う形で特別に出て下さいました。

先生の声と話から、誰だが分かる人もいると思いますが、そこは色々察して大人な対応をお願いします。


## Show Note

- 00:00 Intro
  - [Let's Encrypt](https://letsencrypt.org/)
  - [電子フロンティア財団(EFF)](https://www.eff.org/)
  - [https-everywhere](https://www.eff.org/https-everywhere)

- 09:15 なぜ Let's Encrypt は無料なのか?
  - [Let's Encrypt のスポンサー](https://letsencrypt.org/sponsors/)
  - [Automated Certificate Management Environment (ACME)](https://github.com/letsencrypt/acme-spec)
  - [Simple Certificate Enrolment Protocol (SCEP)](https://www.ietf.org/id/draft-gutmann-scep.txt)
  - [Certificate Management Protocol (CMP)](https://tools.ietf.org/html/rfc4210)
  - [Let's Encrypt ルートの審査プロセス](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)

- 18:00 Let's Encrypt の信用について
  - [IdenTrust](https://www.identrust.com/)
  - [クロスルート証明書](https://jp.globalsign.com/support/faq/431.html)
  - [WebTrust](http://www.webtrust.org/)
  - [DigiNoter のインシデント](https://ja.wikipedia.org/wiki/2011%E5%B9%B4%E3%83%87%E3%82%B8%E3%83%8E%E3%82%BF%E3%83%BC%E4%BA%8B%E4%BB%B6)

- 27:40 Firefox に Public Root を登録するプロセス
  - [Mozilla の審査プロセス](https://wiki.mozilla.org/CA:How_to_apply)
  - [審査プロセスキュー](https://wiki.mozilla.org/CA:Schedule#Queue_for_Public_Discussion)

- 30:30 Let's Encrypt はビジネスで使えるのか?
  - [EV 証明書](https://ja.wikipedia.org/wiki/Extended_Validation_%E8%A8%BC%E6%98%8E%E6%9B%B8)
  - [帝国データバンク](http://www.tdb.co.jp/index.html)
  - [東京商工リサーチ](http://www.tsr-net.co.jp/)

- 42:30 Let's Encrypt 以降の DV 証明書
  - [boulder](https://github.com/letsencrypt/boulder)

- 47:30 自社 DC 内の暗号化と独自 LE
  - [OpenSSL CA.pl](https://www.openssl.org/docs/manmaster/apps/CA.pl.html)
  - [Hardware Security Module](https://en.wikipedia.org/wiki/Hardware_security_module)
  - [WebTrust](http://www.webtrust.org/)
  - [日和見暗号 Opportunistic Encryption](https://ja.wikipedia.org/wiki/%E6%97%A5%E5%92%8C%E8%A6%8B%E6%9A%97%E5%8F%B7%E5%8C%96)
  - [Opportunistic Security: Some Protection Most of the Time (OE)](https://tools.ietf.org/html/rfc7435)

- 1:02:30 「CA は信用できるのか?」問題
  - [近年の CA のインシデント (PDF P.10)](http://www.jnsa.org/seminar/pki-day/2015/data/2-1_urushima.pdf)
  - [CA Browser Forum](https://cabforum.org/)
  - [CA の監査報告書 (LE の例)](https://cert.webtrust.org/SealFile?seal=1987&file=pdf)
  - [Certificate Transparency (CT)](https://www.certificate-transparency.org/)
  - [HTTP Strict Transport Security (HSTS)](https://tools.ietf.org/html/rfc6797)
  - [Public Key Pinning Extension for HTTP (HPKP)](https://tools.ietf.org/html/rfc7469)

- 1:24:30 これからどうなっていくのか?
  - [軽量暗号 Lightweight Cryptography](http://www.cryptrec.go.jp/symposium/20150320_cryptrec-lw.pdf)
