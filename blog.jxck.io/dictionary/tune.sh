#!/usr/bin/env zsh

set -euo pipefail
setopt null_glob

ROOT=${0:A:h}
BLOG_ROOT=${ROOT:h}
REPO_ROOT=${BLOG_ROOT:h}
WORK_DIR=${ROOT}/work
TMP_DIR=${WORK_DIR}/tmp
TRAIN_LIST=${WORK_DIR}/train.list
EVAL_LIST=${WORK_DIR}/eval.list
RESULTS=${WORK_DIR}/results.tsv
BEST_DICT=${WORK_DIR}/best.dict
BEST_PARAMS=${WORK_DIR}/best.params

: ${SLICE_GRID:="8 12 16 24 32"}
: ${BLOCK_GRID:="512 1024 2048 4096"}
: ${FREQ_GRID:="2 3 4"}
: ${DICT_SIZE:=262144}

mkdir -p "${WORK_DIR}" "${TMP_DIR}"
rm -f "${RESULTS}" "${BEST_DICT}" "${BEST_PARAMS}"
rm -rf "${TMP_DIR}"/*

templates=(${REPO_ROOT}/.src/template/*.ejs)
entries=(${BLOG_ROOT}/entries/**/*.html)

if (( ${#templates} == 0 || ${#entries} == 0 )); then
  print -u2 -- "error: missing template or entry files"
  exit 1
fi

ruby -rdigest -e '
  repo_root = File.realpath(ARGV.shift)
  train_list = ARGV.shift
  eval_list = ARGV.shift
  entries = ARGV.map { |path| File.realpath(path) }.sort
  train = []
  evals = []

  entries.each do |path|
    rel = path.delete_prefix("#{repo_root}/")
    bucket = Digest::SHA256.hexdigest(rel)[0, 8].to_i(16) % 5
    if bucket.zero?
      evals << path
    else
      train << path
    end
  end

  File.write(train_list, train.join("\n") + "\n")
  File.write(eval_list, evals.join("\n") + "\n")
' "${REPO_ROOT}" "${TRAIN_LIST}" "${EVAL_LIST}" "${entries[@]}"

train_files=("${templates[@]}" "${(@f)$(<"${TRAIN_LIST}")}")
eval_files=("${(@f)$(<"${EVAL_LIST}")}")

if (( ${#eval_files} == 0 )); then
  print -u2 -- "error: empty eval split"
  exit 1
fi

print -- $'slice_length\tblock_length\tmin_frequency\tbrotli_total\tzstd_total\tstatus' > "${RESULTS}"

best_brotli=-1
best_zstd=-1
best_key=""

for slice_length in ${(z)SLICE_GRID}; do
  for block_length in ${(z)BLOCK_GRID}; do
    if (( block_length < slice_length )); then
      continue
    fi

    for min_frequency in ${(z)FREQ_GRID}; do
      dict_path="${TMP_DIR}/dict-${slice_length}-${block_length}-${min_frequency}.dict"
      bro_total=0
      zstd_total=0

      if ruby "${ROOT}/dict-generator.rb" \
        -o "${dict_path}" \
        -s "${DICT_SIZE}" \
        -l "${slice_length}" \
        -b "${block_length}" \
        -f "${min_frequency}" \
        "${train_files[@]}" >/dev/null 2>&1; then

        for target in "${eval_files[@]}"; do
          bro_out="${TMP_DIR}/out.br"
          zstd_out="${TMP_DIR}/out.zstd"

          brotli -q 11 -w 24 -f --dictionary="${dict_path}" "${target}" -o "${bro_out}" >/dev/null 2>&1
          zstd -f -22 --ultra --long --patch-from="${dict_path}" "${target}" -o "${zstd_out}" >/dev/null 2>&1

          bro_total=$(( bro_total + $(wc -c < "${bro_out}") ))
          zstd_total=$(( zstd_total + $(wc -c < "${zstd_out}") ))
        done

        print -- "${slice_length}\t${block_length}\t${min_frequency}\t${bro_total}\t${zstd_total}\tok" >> "${RESULTS}"

        key="${bro_total}:${zstd_total}:${slice_length}:${block_length}:${min_frequency}"
        if (( best_brotli < 0 || bro_total < best_brotli || (bro_total == best_brotli && zstd_total < best_zstd) )); then
          best_brotli=${bro_total}
          best_zstd=${zstd_total}
          best_key="${key}"
          cp "${dict_path}" "${BEST_DICT}"
          {
            print -- "slice_length=${slice_length}"
            print -- "block_length=${block_length}"
            print -- "min_frequency=${min_frequency}"
            print -- "dict_size=${DICT_SIZE}"
            print -- "brotli_total=${bro_total}"
            print -- "zstd_total=${zstd_total}"
          } > "${BEST_PARAMS}"
        fi
      else
        print -- "${slice_length}\t${block_length}\t${min_frequency}\t-\t-\tfail" >> "${RESULTS}"
      fi

      rm -f "${dict_path}" "${TMP_DIR}/out.br" "${TMP_DIR}/out.zstd"
    done
  done
done

if [[ -z "${best_key}" ]]; then
  print -u2 -- "error: no successful tuning result"
  exit 1
fi

print -- "best ${best_key}"
