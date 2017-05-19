# [a11y][css][logical-properties] CSS Logical Properties and Values Level 1

## Intro

CSS Working Group が、最初の [CSS Logical Properties and Values Level 1](https://drafts.csswg.org/css-logical/) ドラフトを公開した。

簡単に言えば、言語における Left-to-Right / Right-to-Left などの違いに対して、 CSS のプロパティを Logical に指定するための仕様案である。

a11y の観点でも興味深いので、できたばかりで一切安定してない仕様ではあるが、コンセプトを紹介する。



## CSS における Physical と Logical

例えば text align を指定する際に、 css ではそれを left / right など、物理的(physical)な左右を起点に指定するのが基本となっている。

英語や日本語のように Left-to-Right (L2R) で書く言語では、意味的(logical)な先頭が、物理的(physical)には Left になるため、先頭を揃えは left align になる。

しかし、その CSS は、そのままではアラビア語のように Right-to-Left (L2R) の言語に対応したページでは使い回せない。

これは多言語対応などで問題となり、作り分けなどが必要だった。

ここで、「先頭」を物理的な Left/Right ではなく、 Start/End を指定でき、それが言語によって自動的に物理方向に変換されれば、 CSS を共通化できる可能性がある。



## Universal a11y

自動翻訳などが進みつつある今、 CSS をそのままに言語だけ R2L から L2R に変換されるケースも少なくないだろう。

そうした場合に CSS がそのままでも読みやすいかというとそうも行かないだろう。

サイズの指定を % ではなく em/rem で行うのと同じように、 CSS における指定が physical から logical に変わっていくと、表示するデバイス側がその意味的な指定を適切に解釈し、適応していくことができる。

これは、閲覧側がその環境においてより快適な結果を得られる可能性が高く、広くシェアされる Web コンテンツの a11y の増加に繋がるのではないだろうか。
