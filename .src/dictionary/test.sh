#!/usr/bin/env zsh

set -euo pipefail
setopt null_glob

SCRIPT_DIR=${0:A:h}
SRC_DIR=${SCRIPT_DIR:h}
REPO_ROOT=${SRC_DIR:h}
BLOG_ROOT=${REPO_ROOT}/blog.jxck.io

# # 辞書作成
# ruby ${SCRIPT_DIR}/dict-generator.rb \
#   -o ${BLOG_ROOT}/dictionary/entries.dict \
#   -s 262144 \                      # dictionary size: 256KB
#   -l 12 \                          # slice length
#   -b 4096 \                        # block length
#   -f 3 \                           # minimum document frequency
#   -v \                             # verbose output
#   ${REPO_ROOT}/.src/template/*.ejs \
#   ${BLOG_ROOT}/entries/**/*.html

# 圧縮
dict=${BLOG_ROOT}/dictionary/entries.dict

if [[ ! -f "$dict" ]]; then
  print -u2 -- "error: dictionary file not found: $dict"
  exit 1
fi

${SCRIPT_DIR}/compress.sh \
  --dict "$dict" \
  --output-dir ${BLOG_ROOT}/entries/2016-01-27/ \
  -dcb \
  ${BLOG_ROOT}/entries/2016-01-27/new-blog-start.html
