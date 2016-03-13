# [web font][noto sans] Noto Sans の Web Font 対応とサブセットによる最適化

## Intro

このサイトのフォントに Web Font を適用することにした。

フォントには Google と Adobe が協同で開発した Noto Sans CJK JP を採用した。

また、このサイトでは使用しないだろう文字を削除したサブセットを作ることで、フォントサイズを最適化した。


## フォントサイズの最適化

Noto font は、そもそも豆腐(フォントがなかった場合に代替表示される四角)が出ないように(No-豆腐)することをコンセプトにしているため、フォントの網羅率は非常に高い。
そのため Web Font として利用する場合は、全体だとサイズが大きすぎるため、言語毎に提供されるフォントセットの中から、必要なフォントのみを適用することになる。

本サイトでは、 ASCII 、記号、日本語のフォントを用いる。

しかし、特に網羅された漢字の中には、日常では使わない文字が多々ある。
加えて、このサイトはあくまで **技術ブログ** なので、さらに使用する文字は限定される。

そこで、提供されているフォントセットの中から、不要な文字を取り除いたサブセットを作成することで、フォントサイズを最適化が可能である。

Noto Sans は [OFL ライセンス](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) であるため、非常に自由度が高く、こうした変更が可能である。


## Noto Sans Fonts

まず配布ページから、 Noto Sans CJK JP をダウンロードしてくる。

[Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan)


ここに収録されている文字については、 [google fonts](https://www.google.com/fonts/earlyaccess#Noto+Sans+JP) の方に書かれていた。

> Note: Noto Sans JP has been subsetted to 6,992 characters
  and contains most of the characters defined by JIS X 0208
  and some additional characters from Shift_JIS.
  The set includes 6,390 Kanji as well as 602 non Kanji characters
  such as Hiragana, Katakana (including half-width variants),
  ASCII and full-width and punctuations.


このサブセットが含む JIS X 0208 とは、いわゆる JIS漢字コード のことであり、 7000 字近い漢字がきっちり収録されている。

そして font-weight (太さ) が 100~900 まで 7 段階提供されており、それぞれサイズは以下となっている。(やはり太いとデカい)

- 100 NotoSansJP-Thin.otf       (4.0M)
- 300 NotoSansJP-Light.otf      (4.2M)
- 350 NotoSansJP-DemiLight.otf  (4.3M)
- 400 NotoSansJP-Regular.otf    (4.3M)
- 500 NotoSansJP-Medium.otf     (4.3M)
- 700 NotoSansJP-Bold.otf       (4.4M)
- 900 NotoSansJP-Black.otf      (4.6M)

ここまでがデフォルトの状態である。ここから削って行く。


## Font Weight

本サイトでは、 Markdown から生成していることもあり、「通常の文字」と「**太文字**」しか基本的に使わない。
(CSS を別途当てて、調整するといったことをしていない)

従って、 Regular と Bold のみ使用する。

この時点で 8.7MB ある。

- 400 NotoSansJP-Regular.otf    (4.3M)
- 700 NotoSansJP-Bold.otf       (4.4M)

ここからさらに絞っていく。


## JISX0208 第一水準

収録されている、 JIS X 0208 は以下のようになっている。

> JIS（日本工業規格）で定められた漢字の規格で、JISX0208に含まれる。日常で使用頻度の高い漢字を集め、コンピューターで利用するためにコード化したもの。JIS第1水準は2965字で、常用漢字1945字とその他の人名用漢字が含まれており、通常の文書であればJIS第1水準の文字だけで記述できるとされている。JIS第2水準は3390字で、DTPで使用するフォントの多くは、JIS第1水準とJIS第2水準を網羅している。JIS第3水準およびJIS第4水準は、業種によって必要になる特殊な記号などを集めたもので、JISX0208を拡張する別の規格である。

[http://yougo.ascii.jp/caltar/JIS漢字水準](http://yougo.ascii.jp/caltar/JIS%E6%BC%A2%E5%AD%97%E6%B0%B4%E6%BA%96)


しかし、このブログは **技術ブログ** であり、使われる漢字は非常に限定的だ。

そこで、必要な漢字のみを収録したサブセットを作成する。


## 基本ラテン文字 (0000-0070)

いわゆる ASCII 文字。
(ちなみに、 `pre > code` 内のサンプルコードは別のフォントを使うので、コード用という訳ではない)

[Unicode 基本ラテン文字 - Basic Latin -](http://homepage2.nifty.com/k_maeda/code/uni/uni000.html)


制御文字などを覗いて、以下の範囲を全て収録。

```
! " # $ % & ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; < = > ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
```

[BasicLatin.txt](BasicLatin.txt)


## CJK記号と句読点(3000-303F)

句読点やカッコなど。基本的に `[](){}` など半角のカッコを使うが、全角のカッコも必要になる。

[Unicode CJK記号と句読点 - CJK Symbols and Punctuation -](http://homepage2.nifty.com/k_maeda/code/uni/uni090.html)


以下が候補

```
、 。 〃 〄 々 〆 〇 〈 〉 《 》 「 」 『 』
【 】 〒 〓 〔 〕 〖 〗 〘 〙 〚 〛 〜 〝 〞 〟
〠 〡 〢 〣 〤 〥 〦 〧 〨 〩  〪  〫  〬  〭  〮  〯
〰 〱 〲 〳 〴 〵 〶 〷 〸 〹 〺 〻 〼 〽 〾 〿
```

この中から、使わ無いものを覗き、以下のみを収録。


```
、 。 々 〆 〇 「 」 『 』 〜
```

[SymbolsAndPunctuation.txt](SymbolsAndPunctuation.txt)


## ひらがな(3040-3090)

[Unicode ひらがな - Hiragana -](http://homepage2.nifty.com/k_maeda/code/uni/uni091.html)

以下が候補

```
   ぁ あ ぃ い ぅ う ぇ え ぉ お か が き ぎ く
ぐ け げ こ ご さ ざ し じ す ず せ ぜ そ ぞ た
だ ち ぢ っ つ づ て で と ど な に ぬ ね の は
ば ぱ ひ び ぴ ふ ぶ ぷ へ べ ぺ ほ ぼ ぽ ま み
む め も ゃ や ゅ ゆ ょ よ ら り る れ ろ ゎ わ
ゐ ゑ を ん ゔ ゕ ゖ  	゙	゚ ゛ ゜ ゝ ゞ ゟ
```

以下を収録

```
   ぁ あ ぃ い ぅ う ぇ え ぉ お か が き ぎ く
ぐ け げ こ ご さ ざ し じ す ず せ ぜ そ ぞ た
だ ち ぢ っ つ づ て で と ど な に ぬ ね の は
ば ぱ ひ び ぴ ふ ぶ ぷ へ べ ぺ ほ ぼ ぽ ま み
む め も ゃ や ゅ ゆ ょ よ ら り る れ ろ ゎ わ
      を ん
```

[Hiragana.txt](Hiragana.txt)


## カタカナ(30A0-30F0)

[Unicode カタカナ - Katakana -](http://homepage2.nifty.com/k_maeda/code/uni/uni092.html)


以下が候補

```
゠ ァ ア ィ イ ゥ ウ ェ エ ォ オ カ ガ キ ギ ク
グ ケ ゲ コ ゴ サ ザ シ ジ ス ズ セ ゼ ソ ゾ タ
ダ チ ヂ ッ ツ ヅ テ デ ト ド ナ ニ ヌ ネ ノ ハ
バ パ ヒ ビ ピ フ ブ プ ヘ ベ ペ ホ ボ ポ マ ミ
ム メ モ ャ ヤ ュ ユ ョ ヨ ラ リ ル レ ロ ヮ ワ
ヰ ヱ ヲ ン ヴ ヵ ヶ ヷ ヸ ヹ ヺ ・ ー ヽ ヾ ヿ
```


以下を収録

```
   ァ ア ィ イ ゥ ウ ェ エ ォ オ カ ガ キ ギ ク
グ ケ ゲ コ ゴ サ ザ シ ジ ス ズ セ ゼ ソ ゾ タ
ダ チ ヂ ッ ツ ヅ テ デ ト ド ナ ニ ヌ ネ ノ ハ
バ パ ヒ ビ ピ フ ブ プ ヘ ベ ペ ホ ボ ポ マ ミ
ム メ モ ャ ヤ ュ ユ ョ ヨ ラ リ ル レ ロ    ワ
      ヲ ン ヴ ヵ ヶ
```

[Katakana.txt](Katakana.txt)


## 半角形と全角形(FF00-FFE0)

全角の英数や半角カタカナなど。しかし、このブログでは **これらは使わ無い**。

[Unicode 半角形と全角形 - Halfwidth and Fullwidth Forms -](http://homepage2.nifty.com/k_maeda/code/uni/uni120.html)


以下が候補


```
0 1 2 3 4 5 6 7 8 9 A B C D E F
  ！  ＂  ＃  ＄  ％  ＆  ＇  （  ）  ＊  ＋  ，  －  ．  ／
０  １  ２  ３  ４  ５  ６  ７  ８  ９  ：  ；  ＜  ＝  ＞  ？
＠  Ａ  Ｂ  Ｃ  Ｄ  Ｅ  Ｆ  Ｇ  Ｈ  Ｉ  Ｊ  Ｋ  Ｌ  Ｍ  Ｎ  Ｏ
Ｐ  Ｑ  Ｒ  Ｓ  Ｔ  Ｕ  Ｖ  Ｗ  Ｘ  Ｙ  Ｚ  ［  ＼  ］  ＾  ＿
｀  ａ  ｂ  ｃ  ｄ  ｅ  ｆ  ｇ  ｈ  ｉ  ｊ  ｋ  ｌ  ｍ  ｎ  ｏ
ｐ  ｑ  ｒ  ｓ  ｔ  ｕ  ｖ  ｗ  ｘ  ｙ  ｚ  ｛  ｜  ｝  ～  ｟
｠  ｡ ｢ ｣ ､ ･ ｦ ｧ ｨ ｩ ｪ ｫ ｬ ｭ ｮ ｯ
ｰ ｱ ｲ ｳ ｴ ｵ ｶ ｷ ｸ ｹ ｺ ｻ ｼ ｽ ｾ ｿ
ﾀ ﾁ ﾂ ﾃ ﾄ ﾅ ﾆ ﾇ ﾈ ﾉ ﾊ ﾋ ﾌ ﾍ ﾎ ﾏ
ﾐ ﾑ ﾒ ﾓ ﾔ ﾕ ﾖ ﾗ ﾘ ﾙ ﾚ ﾛ ﾜ ﾝ ﾞ ﾟ
  ﾡ ﾢ ﾣ ﾤ ﾥ ﾦ ﾧ ﾨ ﾩ ﾪ ﾫ ﾬ ﾭ ﾮ ﾯ
ﾰ ﾱ ﾲ ﾳ ﾴ ﾵ ﾶ ﾷ ﾸ ﾹ ﾺ ﾻ ﾼ ﾽ ﾾ
    ￂ ￃ ￄ ￅ ￆ ￇ     ￊ ￋ ￌ ￍ ￎ ￏ
    ￒ ￓ ￔ ￕ ￖ ￗ     ￚ ￛ ￜ
￠  ￡  ￢  ￣  ￤  ￥  ￦    ￨ ￩ ￪ ￫ ￬ ￭ ￮
```

収録はしない。


## 漢字

さていよいよ漢字である。単純に Unicode の範囲で指定するわけにはいかない。

過去に書いた記事から、使用する漢字を抽出しようかとも思ったが、ブログを続けていけば新しい漢字が出る可能性は非常に高い。

そのたびにフォントセットを作り直すこともできるが、フォントには長時間のキャッシュを効かせたいため、なるべく一発でこのブログに適したサブセットを作りたいと考える。


### 第一水準漢字

他のサイトでは「第一水準漢字」に絞るという方法も紹介されている。

以下に一覧がある。

[JIS X 0208 第一水準 2965 文字](http://kanji.jitenon.jp/cat/jisdai1.html)


このサブセットを適用しているサイトが多いということは、経験上第二水準にはブログなどの Web サイト使う漢字が少ないということなのだろう。
これでもだいぶ減っているが、ざっと見ても使わなそうな漢字はかなり多い。

先に引用した定義では、第一水準はざっくり 「常用漢字 + 人名用漢字」 となっている。
このサイトでは、人名の引用は基本的に Twitter ID などになるだろう。というか書くのは自分なのでそう縛ればいい。

そこで、常用漢字のみに絞ってみた。

### 常用漢字

常用漢字は文化庁が告示している。2010年に改定があった。

[常用漢字表（平成22年内閣告示第2号）](http://kokugo.bunka.go.jp/kokugo_nihongo/joho/kijun/naikaku/kanji/)


> 一般の社会生活において現代の国語を書き表すための漢字使用の目安を、次の表のように定める。


以下に一覧がある。

[常用漢字 2136 文字](http://kanji.jitenon.jp/cat/joyo.html)


### 常用漢字と第一水準漢字の差分

気になって、二つのセットの diff を取ってみたら、「 **JIS 第一水準にはないが、常用漢字にある漢字** 」があることがわかった。
「JIS 第一水準でだいたい OK」と言われている候補に無い文字が、常用漢字一覧にはある。
つまり、常用漢字一覧のなかでも、使われ無い可能性が高い漢字が含まれるということだ。


以下の 30 文字である。

```
丼 傲 刹 哺 喩 嗅 嘲 彙 恣 惧 慄 憬 拉 摯 曖 楷 毀 璧 瘍 箋 籠 緻 羞 訃 諧 貪 踪 辣 錮 鬱
```

ざっと見て、以下 6 文字はいらないだろうと判断した。

```
哺 惧 彙 楷 憬 錮
```


### 不要な文字

他にも、常用漢字一覧には、まだまだ「 **技術ブログではおおよそ出てこなさそうな漢字** 」がいくつか見られる。

もちろん使う場面はあるかもしれないが、書くのは自分なので把握しておけば良い。

どうしても必要ならフォントセットに追加すれば良いが、その頻度もそう高くはないだろう。

よって、いらない漢字を一つ一つ丁寧に手動で取り除いた。

先の 6 文字に 17 文字加えて、以下 23 文字が削除対象である。


```
畝 租 朕 逓 哺 曹 惧 梗 痘 虞 嗣 塑 彙 楷 窟 嘱 畿 憬 璃 錮 嚇 濯 璽
```

除いた結果が以下である。

[kanji.txt](kanji.txt)


## 結果

ここまでの結果を合わせる。


| 範囲            | 文字数 |
|:----------------|-------:|
| 基本ラテン文字  | 94     |
| CJK記号と句読点 | 10     |
| ひらがな        | 81     |
| カタカナ        | 83     |
| 半角形と全角形  | 0      |
| 常用漢字        | 2136   |
| 不要文字        | - 23   |
| 合計            | 2381   |


全て合わせたのが以下である。

[All.txt](All.txt)


## フォント生成

ここまでに選択した文字のみで Web Font を作成する。


### サブセット化

まず、以下のツールを用い、この対象文字だけを抜き出したサブセットを作成する。

[サブセットフォントメーカー](http://opentype.jp/subsetfontmk.htm)


- [NotoSansCJKjp-Jxck-Bold.otf]() (473.2K)
- [NotoSansCJKjp-Jxck-Regular.otf]() (471.2K)


### Woff 変換

この OTF ファイルを、以下のツールを用い、 Woff 形式に変換する。

[WOFFコンバータ](http://opentype.jp/woffconv.htm)


メタデータは一切付与しない。
また IE はどうでもいいので、 IE に対応させるための EOT ファイルも作成し無い。


- [NotoSansCJKjp-Jxck-Bold.woff](/assets/font/NotoSansCJKjp-Jxck-Bold.woff) (379.7K)
- [NotoSansCJKjp-Jxck-Regular.woff](/assets/font/NotoSansCJKjp-Jxck-Regular.woff) (375.8K)


## 効果

簡単にサイズの比較を行ってみる。
比較は Woff で行い、フォントは Regular を使う。


### 漢字

まず対象とする漢字による、サイズの変化はこうなる。

| 範囲     | サイズ |
|:---------|-------:|
| JISX0208 | 505.0K |
| 常用漢字 | 356.1K |
| 削除後   | 351.6K |


### 結果

もしここまでに見てきた各項目にあげた候補を、一切削除せず、漢字を JISX0208 とした場合はこうなる。

|        | サイズ |
|:-------|-------:|
| before | 547.5K |
| after  | 375.8K |


## フォントの設定

### font-face の指定

まず woff ファイルを配布し、それを読み込ませる。
ただし、 Android Marshmallow では Noto Sans がビルドインになったため、 Regular のみが全フォント入っている。
他にも、このブログを見に来る人は、自分でローカルインストールしている人がいるだろう。
そうした場合、 `local()` を用いてシステムフォントを優先すれば、ダウンロードが不要になる。

現在 NotoSans は "NotoSansCJKjp-Bold.otf" という名前で配布されている。

Android は ["NotoSansJP-Regular.otf" という名前で入っているらしい](http://toach.click/2016/01/30/how-to-noto-sans-japanese#Android_MarshmallowNoto_Sans_Japanese) ため、それも含めて以下のように設定する。

```css
@font-face {
  font-family: "NotoSansCJKjp-Jxck"
  font-style: normal;
  font-weight: 400;
  src: local("NotoSansCJKjp-Regular.otf"),
       local("NotoSansJP-Regular.otf"),
       url("/assets/font/NotoSansCJKjp-Jxck.Regular.woff?ver=1") format("woff");
}

@font-face {
  font-family: "NotoSansCJKjp-Jxck"
  font-style: normal;
  font-weight: 700;
  src: local("NotoSansCJKjp-Bold.otf"),
       local("NotoSansJP-Bold.otf"),
       url("/assets/font/NotoSansCJKjp-Jxck.Bold.woff?ver=1") format("woff");
}
```


### font-family の指定

使用したフォントを CSS に設定する。
Google はガイドラインを公開している。

[Guidelines for Using Noto](https://www.google.com/get/noto/help/guidelines/)


システムにある場合は正式名称で、こちらが提供したフォントがダウンロードされた場合は、それが使われるようにする。
基本的にはサイト全体に適用するため `body` に指定し、 `pre > code` 内は別にしたいため、そこだけ上書きしている。

```css
body {
  font-family: "Noto Sans", "Noto Sans CJK JP", "NotoSansCJKjp-Jxck", sans-serif;
}
```


## キャッシュ設定

フォントは、基本的には変更が非常に少ないファイルであるため、積極的にキャッシュをしていきたい。
ただし、今回のような作り方の場合には、フォントの追加によるファイルの更新は皆無ではないため、 URL にバージョンを忘れずに入れる。(font-face の指定参照)


```
url("/assets/font/NotoSansCJKjp-Jxck.Bold.woff?ver=1") format("woff");
```

ここでは max-age を一年とし、フォントを作り直した場合はバージョンを変える

```
Cache-Control: max-age=31536000
```


## まとめ

Web Font もだいぶ一般的になってきたため、今後の Web 作成では、 Web Font の存在は前提となっていくだろうと感じている。
このサイトではパフォーマンスに関わる最適化手法を色々と試しているが、 Web Font も無しに表示の速さを語っても片手落ちだろうと思い、いわゆる鉄下駄として入れてみた。

しかし、入れてみれば記事の見た目にハリがでて、これはこれで非常に良いと感じた。
