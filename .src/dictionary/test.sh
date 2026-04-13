#!/usr/bin/env zsh

# repo root から実行する想定。

# # 辞書作成
# ruby ./.src/dictionary/dict-generator.rb \
#   -d ./blog.jxck.io/dictionary/ \  # output dir, filename is <sha256hex>.dict
#   -s 262144 \                      # dictionary size: 256KB
#   -l 12 \                          # slice length
#   -b 4096 \                        # block length
#   -f 3 \                           # minimum document frequency
#   -v \                             # verbose output
#   .src/template/*.ejs \
#   blog.jxck.io/entries/**/*.html

# 圧縮
dict=(blog.jxck.io/dictionary/*.dict(N[1])) # 一個だけ
./.src/dictionary/compress.sh \
  --dict "$dict" \
  --output-dir blog.jxck.io/entries/2016-01-27/ \
  -dcb \
  blog.jxck.io/entries/2016-01-27/new-blog-start.html
