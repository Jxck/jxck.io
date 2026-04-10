#!/usr/bin/env zsh

# # 辞書作成
# ruby ./dict-generator.rb \
#   -d ./ \                  # output dir, filename is <sha256hex>.dict
#   -s 262144 \              # dictionary size: 256KB
#   -l 12 \                  # slice length
#   -b 4096 \                # block length
#   -f 3 \                   # minimum document frequency
#   -v \                     # verbose output
#   ../../.src/template/*.ejs \
#   ../entries/**/*.html

# 圧縮
dict=(./*.dict(N[1])) # 一個だけ
./compress.sh \
  --dict "$dict" \
  --output-dir ../entries/2016-01-27/ \
  -dcb \
  ../entries/2016-01-27/new-blog-start.html