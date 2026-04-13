#!/usr/bin/env zsh

set -euo pipefail
setopt null_glob

SCRIPT_DIR=${0:A:h}
SRC_DIR=${SCRIPT_DIR:h}
REPO_ROOT=${SRC_DIR:h}
BLOG_ROOT=${REPO_ROOT}/blog.jxck.io
SAMPLE_DIR=${SCRIPT_DIR}/sample

# 定数定義
DCZ_DICT=${SAMPLE_DIR}/entries.dcz.dict
DCB_DICT=${SAMPLE_DIR}/entries.dcb.dict
CAT_DICT=${SAMPLE_DIR}/entries.cat.dict
RB_DICT=${SAMPLE_DIR}/entries.rb.dict
TEMPLATES=(${REPO_ROOT}/.src/template/*.ejs)
ENTRIES=(${BLOG_ROOT}/entries/**/*.html)
SAMPLES=(${SAMPLE_DIR}/*.html)

if (( ${#TEMPLATES} == 0 || ${#ENTRIES} == 0 || ${#SAMPLES} == 0 )); then
  print -u2 -- "error: missing templates, entries, or sample html files"
  exit 1
fi

# クリーンアップ
\rm -f ${SAMPLE_DIR}/*.dict ${SAMPLE_DIR}/*.zstd ${SAMPLE_DIR}/*.br

# 辞書生成

echo ">>> Template 単純結合"
cat "${TEMPLATES[@]}" > $CAT_DICT

echo ">>> Zstd Train Mode"
zstd --train \
    --maxdict=262144 \
    "${TEMPLATES[@]}" \
    "${ENTRIES[@]}" \
    -o $DCZ_DICT

echo ">>> Brotli Dictionary Generator"
dictionary_generator \
    --dsh \
    -t262144 \
    $DCB_DICT \
    "${TEMPLATES[@]}" \
    "${ENTRIES[@]}"

echo ">>> Ruby Dict Generator"
ruby "${SCRIPT_DIR}/dict-generator.rb" \
    -s 262144 \
    -l 12 \
    -b 4096 \
    -f 3 \
    -o $RB_DICT \
    -v \
    "${TEMPLATES[@]}" \
    "${ENTRIES[@]}"


# 辞書を用いた圧縮 (raw content dictionary)
for TARGET in "${SAMPLES[@]}"; do
    zstd -f -22 --ultra --long --patch-from=$DCZ_DICT $TARGET -o ${TARGET}.zstd.zstd
    zstd -f -22 --ultra --long --patch-from=$DCB_DICT $TARGET -o ${TARGET}.br.zstd
    zstd -f -22 --ultra --long --patch-from=$CAT_DICT $TARGET -o ${TARGET}.cat.zstd
    zstd -f -22 --ultra --long --patch-from=$RB_DICT $TARGET -o ${TARGET}.rb.zstd
    brotli -q 11 -w 24 -f --dictionary=$DCZ_DICT $TARGET -o ${TARGET}.zstd.br
    brotli -q 11 -w 24 -f --dictionary=$DCB_DICT $TARGET -o ${TARGET}.br.br
    brotli -q 11 -w 24 -f --dictionary=$CAT_DICT $TARGET -o ${TARGET}.cat.br
    brotli -q 11 -w 24 -f --dictionary=$RB_DICT $TARGET -o ${TARGET}.rb.br
done




# # dcz ヘッダ付与 (40 bytes = magic 8 + sha256 32)
# DCZ_OUT=${TARGET}.dcz
# HASH=$(sha256sum "$DCZ_DICT" | cut -f1 -d' ')
# printf '\x5e\x2a\x4d\x18\x20\x00\x00\x00' > "$DCZ_OUT"
# echo -n "$HASH" | xxd -r -p >> "$DCZ_OUT"
# cat ${TARGET}.zstd >> "$DCZ_OUT"
# rm ${TARGET}.zstd

# ./blog.jxck.io/dictionary/hash.rb $DCZ_DICT
# ./blog.jxck.io/dictionary/hash.rb $DCB_DICT
