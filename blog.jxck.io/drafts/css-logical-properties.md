# [a11y][css][writing-mode][logical-properties] CSS Writing Mode と Logical Prop による i18n a11y

## Intro

CSS Working Group が、最初の [CSS Logical Properties and Values Level 1](https://drafts.csswg.org/css-logical/) ドラフトを公開した。

簡単に言えば、言語における Left-to-Right / Right-to-Left などの違いに対して、 CSS のプロパティを Logical に指定するための仕様案である。

a11y の観点でも興味深いので、そのコンセプトを紹介する。


## CSS における Physical と Logical

例えば text align を指定する際に、 css ではそれを left / right など、物理的(physical)な左右を起点に指定するのが基本となっている。

英語のように Left-to-Right (L2R) で書く言語では、意味的(logical)な先頭が、物理的(physical)には Left になるため、先頭を揃えは left align になる。

しかし、その CSS は、そのままではアラビア語のように Right-to-Left (R2L) の言語に対応したページには適さないため、多言語対応に R2L を入れる場合作り分けなどが必要だった。

ここで、「先頭」を物理的な Left/Right ではなく、論理的な Start/End で指定し、それが言語によって文字の方向に応じて物理方向に変換されれば、 CSS の共通化が容易になる。

論理的な方向は、決して文字の方向だけではない。

例えば、デバイス


## Universal a11y

自動翻訳などが進みつつある今、 CSS をそのままに言語だけ R2L から L2R に変換されるケースも少なくないだろう。

そうした場合に CSS がそのままでも読みやすいかというとそうも行かないだろう。

サイズの指定を % ではなく em/rem で行うのと同じように、 CSS における指定が physical から logical に変わっていくと、表示するデバイス側がその意味的な指定を適切に解釈し、適応していくことができる。

これは、閲覧側がその環境においてより快適な結果を得られる可能性が高く、広くシェアされる Web コンテンツの a11y の増加に繋がるのではないだろうか。















CSS Logical Properties and Values Level 1

Introduction

Note: See [CSS3-WRITING-MODES] for a proper introduction to writing modes; this module assumes familiarity with its terminology.

Because different writing systems are written in different directions, a variety of writing modes exist: left to right, top to bottom; right to left, top to bottom; bottom to top, right to left; etc. logical concepts like the "start" of a page or line map differently to physical concepts like the "top" of a line or "left edge" of a paragraph. Some aspects of a layout are actually relative to the writing directions, and thus will vary when the page is translated to a different system; others are inherently relative to the page's physical orientation.

writing system が違うことで、記述の方向も違う。

先頭ぞろえといっても、英語では左かもしれないが、アラビア文字では右になる。
これは本来、左右という物理的な方向ではなく、先頭という論理的な方向で指示できる方が良い。

一本、ボタンの影などは、言語によらず株にあった方が良いだろう。


For example, lists, headings, and paragraphs are typically left-aligned in English; but actually they are start-aligned, because in Arabic the same constructs are right-aligned, and a multilingual document will need to accommodate both writing systems accordingly. However the drop shadows on buttons on a page must remain consistent throughout, so their offset will be chosen based on visual considerations and physical directions, and not vary by writing system.

Since CSS was originally designed with only physical coordinates in its controls,
this module introduces text-flow-relative equivalents so that declarations in a CSS style sheet can be expressed in flow-relative terms.
It defines the mapping and cascading of equivalent properties,
some new properties and values equivalent to those in CSS2.1,
and the principles used to derive their syntaxes.
Future CSS specifications are expected to incorporate both sets of coordinates in their property and value definitions,
so this module will not track the introduction of flow-relative variants of newer CSS features.

CSS は基本的に物理方向しか考えてない。
このモジュールは、 text-flow-relative と同等、なので、 CSS style の方向は flow-relative に表現される
ここでは、そのマッピングを定義する。


CSS Writing Modes' Abstract Box Terminology section defines how to map between flow-relative and physical terms. This mapping controls the interpretation of flow-relative keywords and properties.

抽象ボックスのセクションは


 Things That Are Unstable Since implementation of parts of this module is effectively required for shipping an implementation of CSS Writing Modes on the Web (in order to correctly implement the default HTML styles), The CSSWG resolved that although the draft is not very stable overall, the requisite features in §1 Flow-Relative Values: block-start, block-end, inline-start, inline-end and §3 Flow-Relative Box Model Properties are approved for shipping. However, there are a number of unstable features in this draft (which are not required for implementing the HTML default style sheet, incidentally), and these are:
 The float and clear keywords, because it is not yet clear what the upcoming 2-dimensional syntax of float will be. (This has been resolved as of April 2017.)
 The inset-* properties, because the name of the prefix is undecided. (It used to be offset-*, but ended up conflicting with another CSS feature.)
 The logical keyword on shorthands, because the name of the keyword may change or it may be replaced by some other syntactic marker.
 The background-image-transform and border-image-transform properties, because they have, as far as the editor is aware, received no review from anyone and may or may not be well-designed.
 Comments and suggestions are welcome on these issues. Please file them in GitHub, tweet them to @csswg, or send them to www-style@w3.org.










## writing mode

1. Introduction to Writing Modes

CSS Writing Modes Level 4 defines CSS features to support for various international writing modes, such as left-to-right (e.g. Latin or Indic), right-to-left (e.g. Hebrew or Arabic), bidirectional (e.g. mixed Latin and Arabic) and vertical (e.g. Asian scripts).

CSS Writing Modes Level 4 では、様々な言語の方向を定義する。

- Left to Right (Latin, Indic etc)
- Right to Left (Hebrew, Arabic etc)
- Bidirectional (mixed Latin & Arbic etc)
- Vertical (Asian etc)


A writing mode in CSS is determined by the writing-mode, direction, and text-orientation properties. It is defined primarily in terms of its inline base direction and block flow direction:

CSS の Writing Mode は、以下からなる。

- Writing Mode
- Direction
- Text-Orientation





Latin-based writing mode
Mongolian-based writing mode
Han-based writing mode

The inline base direction is the primary direction in which content is ordered on a line and defines on which sides the “start” and “end” of a line are. The direction property specifies the inline base direction of a box and, together with the unicode-bidi property and the inherent directionality of any text content, determines the ordering of inline-level content within a line.





   The block flow direction is the direction in which block-level boxes stack and the direction in which line boxes stack within a block container. The writing-mode property determines the block flow direction.

   The typographic mode determines if text should apply typographic conventions specific to vertical flow for vertical scripts. This concept distinguishes vertical flow for vertical scripts from rotated horizontal flow.

   A horizontal writing mode is one with horizontal lines of text, i.e. a downward or upward block flow. A vertical writing mode is one with vertical lines of text, i.e. a leftward or rightward block flow.

   These terms should not be confused with vertical block flow (which is a downward or upward block flow) and horizontal block flow (which is leftward or rightward block flow). To avoid confusion, CSS specifications avoid this latter set of terms.

   Writing systems typically have one or two native writing modes. Some examples are:

   Latin-based systems are typically written using a left-to-right inline direction with a downward (top-to-bottom) block flow direction.
   Arabic-based systems are typically written using a right-to-left inline direction with a downward (top-to-bottom) block flow direction.
   Mongolian-based systems are typically written using a top-to-bottom inline direction with a rightward (left-to-right) block flow direction.
   Han-based systems are commonly written using a left-to-right inline direction with a downward (top-to-bottom) block flow direction, or a top-to-bottom inline direction with a leftward (right-to-left) block flow direction. Many magazines and newspapers will mix these two writing modes on the same page.
   The text-orientation component of the writing mode controls the glyph orientation.

   See Unicode Technical Note #22 [UTN22] (HTML version) for a more in-depth introduction to writing modes and vertical text.


