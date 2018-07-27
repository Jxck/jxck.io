# [webrtc][AV1][AOM] Apple の AOM 加盟と AV1 への期待

## Intro

Apple が Alliance for Open Media に加盟したという報道があった。

もし、このまま Safari が AV1 をサポートするまで至れば、 WebRTC のコーデック戦争に一旦の落ち着きが出ると思われる。

[Apple joins alliance to shrink your online videos - CNET](https://www.cnet.com/news/apple-online-video-compression-av1/)

この動向について解説する。


## WebRTC Codec WAR

WebRTC によって、動画/音声をやり取りする際に、ブラウザはどのコーデックをサポートするべきかという問題があった。

特に動画については以下のような要件が求められる

- パテントフリー
- 圧縮効率率/計算速度 etc
- ハードウェアエンコーダサポート
- 普及率


パフォーマンス要件は確かに無視できないが、 Web において最も重要なのはやはりパテントの問題である。

そこで、パテントフリーを謳う新たなコーデックの開発も行われ、度々候補として提案されてきた。

しかし、各社とも自分が保有する技術に寄せたいという思惑もあり長いこと議論が行われた。

結果的に、音声は Opus でほぼ落ち着いていたが、動画は VP8 と H.264 という折衷案で折れることになった。


- [RFC 7742 - WebRTC Video Processing and Codec Requirements](https://tools.ietf.org/html/rfc7742)
- [RFC 7874 - WebRTC Audio Codec and Processing Requirements](https://tools.ietf.org/html/rfc7874)

一方すでに、 H.265/VP9 が性能的にも更新しており、 H.264/VP8 だけをサポートして終わりともいかない。


## コーデックの選択

新しいコーデックが単体でどんなパフォーマンスを記録しても、モバイル端末などを見ればハードウェアのサポートは無視できない。

H.264 はパテントプールである MPEGLA の存在が常につきまとうが、それでも普及するのはこの部分が大きいからという視点がある。

VP9 は、ロイヤリティフリーでありながら、特に Safari がサポートしないことがネックとなっている。

時代はすでに H.265, VP9 で議論が進んでいる現状でも、ハードのサポートは一歩遅れてくる。

一方で、サポートする側がどのコーデックを詰むかも、コーデックの普及状況を鑑みる。

WebRTC のように相互に通信をし、リアルタイムに処理をする必要がある場合、ライセンス的に安全で、ハードウェアエンコーダがサポートしており、ブラウザ実装が進んでいて、スペックパフォーマンスに難が無い、 *単一のコーデック* があるのが嬉しいのが本音だ。

音声は Opus で良いとして、動画については H.264/H.265/VP8/VP9 という選択肢の幅は、多様性として受け入れるほど嬉しいと言い切れない現状がある。


## AV1

こうした問題を解決することを目標として AOM (Alliance for Open Media) により開発されているのが AV1 である。

AV1 は、最初から H.265 や VP9 を置き換えることを目的としており、 Google も VP10 開発から舵を切りその成果を組み込んでいる。

もちろん、最初からロイヤリティフリーなコーデックであることを目指している。

Alliance のメンバーには AMD, ARM, Intel, NVIDIA などが名を連ね、ハードウェアのサポートも期待ができそうだ。

そして、 Google, Microsoft, Mozilla がいるため、 Chrome/Edge/Firefox については実装が期待される。

コンテンツも、既に Amazon Prim, Youtube, Nertflix, Hulu などの指示も取り付けているようだ。

つまり、 WebRTC 的に言えば「*あと Apple だけ*」だった。


## Apple joins AOM

そんな中、新年早々 Apple が AOM に join したというニュースが出た。


[Apple joins alliance to shrink your online videos - CNET](https://www.cnet.com/news/apple-online-video-compression-av1/)

このニュースのソースは、 AOM の公式アナウンス等ではなく、 [AOM のページ](http://aomedia.org/about-us/) のメンバー欄に Apple が追加されたことを元にしているようだ。

- [before](https://web.archive.org/web/20180104174428/http://aomedia.org/about-us/)
- [after](https://web.archive.org/web/20171226184721/http://aomedia.org/about-us/)

この大きな更新に、即アナウンスが出ないのもちょっと気にかかるが、それでも参画したのであればある程度の進展が期待できるのでは無いかと個人的には考えている。

最善のプロセスは

- パテントフリーのまま
- AV1 そのものの実装が加速し
- H.265/VP9 の性能をきちんと更新しつつ
- 多くのハードでエンコーダがサポートされ
- 各ブラウザが対応する世界

だ。

Opus + AV1 on WebM がデファクトスタンダードになり、それをなんの気兼ねも無く使える世界がくればと願う。
