#!/usr/bin/env zsh

set -euo pipefail
setopt null_glob typeset_silent

SCRIPT_DIR=${0:A:h}
SRC_DIR=${SCRIPT_DIR:h}
REPO_ROOT=${SRC_DIR:h}
RUBY_GENERATOR=${SCRIPT_DIR}/dict-generator.rb
RUST_CDT=${RUST_CDT:-cdt}
WARM_RUNS=5
DICT_SIZE=262144
SLICE_LENGTH=12
BLOCK_LENGTH=4096
MIN_FREQUENCY=3

samples=("$@")
if (( ${#samples} == 0 )); then
  samples=(${REPO_ROOT}/blog.jxck.io/entries/**/*.html)
fi

if (( ${#samples} == 0 )); then
  print -u2 -- "error: no html samples found"
  exit 1
fi

if [[ ! -f "${RUBY_GENERATOR}" ]]; then
  print -u2 -- "error: Ruby generator not found: ${RUBY_GENERATOR}"
  exit 1
fi

if ! command -v "${RUST_CDT}" >/dev/null 2>&1; then
  print -u2 -- "error: missing ${RUST_CDT} on PATH"
  exit 1
fi

work_dir=$(mktemp -d "${TMPDIR:-/tmp}/cdt-bench.XXXXXX")
trap 'rm -rf "${work_dir}"' EXIT

median_of() {
  printf '%s\n' "$@" | sort -n | awk 'NR == 3 { print; exit }'
}

run_once() {
  local label="$1"
  local out_path="$2"
  shift 2

  local time_log="${work_dir}/${label}.time"
  /usr/bin/time -p "$@" >/dev/null 2>"${time_log}"
  awk '$1 == "real" { print $2; exit }' "${time_log}"
}

benchmark_case() {
  local label="$1"
  shift

  local -a times=()

  print -u2 -- ">>> ${label}: cold run (discarded)"
  run_once "${label}-cold" "${work_dir}/${label}.dict" "$@" >/dev/null

  local run
  for run in $(seq 1 "${WARM_RUNS}"); do
    local elapsed
    elapsed=$(run_once "${label}-${run}" "${work_dir}/${label}.dict" "$@")
    times+=("${elapsed}")
    print -u2 -- "    warm ${run}: ${elapsed}s"
  done

  local median
  median=$(median_of "${times[@]}")
  print -u2 -- "    median: ${median}s"
  printf '%s\n' "${median}"
}

print -u2 -- "Benchmark corpus: ${#samples} files"
print -u2 -- "Parameters: -s ${DICT_SIZE} -l ${SLICE_LENGTH} -b ${BLOCK_LENGTH} -f ${MIN_FREQUENCY}"

ruby_median=$(
  benchmark_case ruby \
    ruby "${RUBY_GENERATOR}" \
      -o "${work_dir}/ruby.dict" \
      -s "${DICT_SIZE}" \
      -l "${SLICE_LENGTH}" \
      -b "${BLOCK_LENGTH}" \
      -f "${MIN_FREQUENCY}" \
      "${samples[@]}"
)

rust_median=$(
  benchmark_case rust \
    "${RUST_CDT}" dictionary \
      -o "${work_dir}/rust.dict" \
      -s "${DICT_SIZE}" \
      -l "${SLICE_LENGTH}" \
      -b "${BLOCK_LENGTH}" \
      -f "${MIN_FREQUENCY}" \
      "${samples[@]}"
)

print
print -- "Ruby median: ${ruby_median}s"
print -- "Rust median: ${rust_median}s"

if awk "BEGIN { exit !(${rust_median} < ${ruby_median}) }"; then
  print -- "result: rust is faster"
else
  print -- "result: rust is not faster"
  exit 1
fi
