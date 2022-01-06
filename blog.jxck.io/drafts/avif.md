# [tag] AVIF 対応

## Intro

今更だが、 AVIF に対応した。


ライブラリ

- go avif
- npx avif
- どちらでも良いが今回は gif に対応してそうな npx を使った


- 実際は gif が対応してなかった
  - libavif をビルドした avifenc が必要

```
ffmpeg -i $*.gif -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 15 $*.avif
```

- gif to avif
  - https://github.com/AOMediaCodec/libavif/wiki/Sequences
- ビルド方法
  - https://web.dev/compress-images-avif/#create-an-avif-image-with-default-settings







## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/avif/>


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
 - https://caniuse.com/avif

