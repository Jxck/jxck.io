# [passkey] Passkey への道 #0: Intro

## Intro

フィッシング詐欺や Infostealer を用いた金融サイトの乗っ取り詐欺などは、その被害総額が [5000 億円](https://www3.nhk.or.jp/news/html/20250606/k10014827041000.html) を突破してもなお拡大し続けている。米国で発生した 2024 年のオンライン詐欺被害は [166 億ドル](https://industrialcyber.co/reports/fbis-internet-crime-report-2024-records-16-6-billion-in-cybercrime-losses-amid-rising-ransomware-threats/) に達した。

証券や銀行サービスからは「FIDO 認証登録のお願い」のようなメールが絶えず届き、最近では [Gmail のような 20 億以上のユーザがいる大手サービス](https://forbesjapan.com/articles/detail/79909) や、[警視庁サイバー犯罪対策課](https://x.com/MPD_cybersec/status/1937677739882078268)まで「**Passkey を利用しましょう**」と移行を促すアナウンスをするところまできている。

まだ、多くの人が "**Passkey**" という名前すら知らないか、聞いたことはあるがきちんと移行まではしていないという状況だろう。新しい技術とはいえ、Passkey の普及があと 1 年早かっただけで、防げた被害は計り知れないだろうと痛感する。

一方、Passkey を知っていながら、誤解のある人も少なくないようだ。

- 複雑なパスワードを登録しているから移行する必要はない
- 2FA を設定しているから必要ない
- 登録したいサービスに、指紋を渡すのは嫌だ
- Google や Apple に認証までロックインされたくない
- 変なことしてログインできなくなるのが怖い
- etc etc

また、移行する必要性を認識しながら、パスワードマネージャ等保存先が十分に浸透していなかったり、サービス側の Passkey 対応が普及途上な側面もある。


## Passkey への道

今回から数回の連載形式で

- なぜユーザは Passkey に移行しないといけなくなってしまったのか
- なぜサービスは Passkey に対応しないといけなくなってしまったのか

といった部分を、認証を取り巻く様々な問題の歴史をたどりながら、連載形式で解説していきたい。

Passkey の解説といえば、多くの場合は「サービスにいかに実装するか」「API はどのように使うか」といった部分にフォーカスされがちだが、今回はそういった話を抜きにし、なるべくコードや仕様や専門用語を減らし、認証に詳しくないユーザや、一般ユーザにもギリギリ伝わるような解説を試みたい。


## Links

- [Passkey への道 #0: Intro](https://blog.jxck.io/entries/2025-07-07/load-to-passkey-0.html)
- [Passkey への道 #1: 平成の Password 感](https://blog.jxck.io/entries/2025-07-08/load-to-passkey-1.html)
- [Passkey への道 #2: 2FA/TOTP](https://blog.jxck.io/entries/2025-07-09/load-to-passkey-2.html)
- [Passkey への道 #3: 手入力の限界](https://blog.jxck.io/entries/2025-07-10/load-to-passkey-3.html)
- [Passkey への道 #4: 文字列の限界](https://blog.jxck.io/entries/2025-07-11/load-to-passkey-4.html)
- [Passkey への道 #5: 2FA/WebAuthn](https://blog.jxck.io/entries/2025-07-12/load-to-passkey-5.html)
- [Passkey への道 #6: タブーを破った Apple](https://blog.jxck.io/entries/2025-07-13/load-to-passkey-6.html)
- [Passkey への道 #7: そして Username-Less へ](https://blog.jxck.io/entries/2025-07-14/load-to-passkey-7.html)
- [Passkey への道 #8: サービスにとって「移行」のゴールは何か?](https://blog.jxck.io/entries/2025-07-15/load-to-passkey-8.html)
- [Passkey への道 #9: ユーザに求められる令和のアカウントリテラシ](https://blog.jxck.io/entries/2025-07-16/load-to-passkey-9.html)
- [Passkey への道 #10: 1Password 導入セミナ](https://blog.jxck.io/entries/2025-07-23/load-to-passkey-10.html)