## RSS

https://help.apple.com/itc/podcasts_connect/#/itc1723472cb
https://help.apple.com/itc/podcasts_connect/#/itca5b22233a
https://help.apple.com/itc/podcasts_connect/#/itc2b3780e76

### feed / image requirement

- RSS 2.0 じゃないとダメらしい
- 1400x1400 ~ 3000x3000 の間で 72dpi, JPEG/PNG のアートワークが必要(gzip 可っぽい)
- HTTPS 可、HEAD メソッドと byte-range のサポートが必要
- M4A, MP3, MOV, MP4, M4V, PDF, EPUB
- `<enclosure>` でエピソードを囲む
- `<channel>` `<item>` レベルの title, author, description が itunes search で使われる
- `<itunes:summary>` 無ければ `<description>` に詳細、メディアフォーマット、スケジュールなど詳細を記す
- `<itunes:category>` にサブカテゴリーを定義できる
- `<itunes:summary><![CDATA[<a href="http://www.apple.com">Apple</a>]]></itunes:summary>` みたいにして display issue を防ぐ
- `<item>` を追加して行く、順番は `<pubDate>` で判断される。24h 以内なら `<itunes:order>` で上書きもできる

