#!/usr/bin/env zsh

# sample/ を corpus にした軽量ベンチ。
# cdt dictionary で辞書を生成し、sample HTML を本番相当の最高圧縮
# (brotli -q 11 -w 24 / zstd -22 --ultra --long) で圧縮して合計サイズを出す。
#
# パラメータは本番採用値 (Makefile の DICT_GENERATOR と一致) を既定にし、
# 環境変数で上書きして手早く what-if できる。全 corpus での正式なパラメータ
# 探索は work/tune.sh を使う。

set -euo pipefail
setopt null_glob

SCRIPT_DIR=${0:A:h}
SAMPLE_DIR=${SCRIPT_DIR}/sample
CDT=${CDT:-cdt}

# 本番採用パラメータ (Makefile DICT_GENERATOR と一致)
: ${DICT_SIZE:=262144}
: ${SLICE_LENGTH:=12}
: ${BLOCK_LENGTH:=4096}
: ${MIN_FREQUENCY:=3}

samples=(${SAMPLE_DIR}/*.html)
if (( ${#samples} == 0 )); then
  print -u2 -- "error: no sample html under ${SAMPLE_DIR}"
  exit 1
fi

if ! command -v "${CDT}" >/dev/null 2>&1; then
  print -u2 -- "error: missing ${CDT} on PATH (install: cargo install cdt-toolkit)"
  exit 1
fi

work_dir=$(mktemp -d "${TMPDIR:-/tmp}/cdt-sample-bench.XXXXXX")
trap 'rm -rf "${work_dir}"' EXIT
dict="${work_dir}/sample.dict"

"${CDT}" dictionary \
  -o "${dict}" \
  -s "${DICT_SIZE}" \
  -l "${SLICE_LENGTH}" \
  -b "${BLOCK_LENGTH}" \
  -f "${MIN_FREQUENCY}" \
  "${samples[@]}" >/dev/null

print -- "corpus: ${#samples} files (sample/)"
print -- "params: -s ${DICT_SIZE} -l ${SLICE_LENGTH} -b ${BLOCK_LENGTH} -f ${MIN_FREQUENCY}"
print -- "dict:   $(wc -c < ${dict}) bytes"
print
print -- $'file\traw\tbrotli\tzstd'

raw_total=0
bro_total=0
zstd_total=0

for target in "${samples[@]}"; do
  bro_out="${work_dir}/out.br"
  zstd_out="${work_dir}/out.zstd"

  brotli -q 11 -w 24 -f --dictionary="${dict}" "${target}" -o "${bro_out}"
  zstd -q -f -22 --ultra --long --patch-from="${dict}" "${target}" -o "${zstd_out}"

  raw=$(wc -c < "${target}")
  bro=$(wc -c < "${bro_out}")
  zst=$(wc -c < "${zstd_out}")

  raw_total=$(( raw_total + raw ))
  bro_total=$(( bro_total + bro ))
  zstd_total=$(( zstd_total + zst ))

  print -- "${target:t}\t${raw}\t${bro}\t${zst}"
done

print
print -- "total\t${raw_total}\t${bro_total}\t${zstd_total}"
