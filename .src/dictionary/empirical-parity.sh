#!/usr/bin/env zsh

set -euo pipefail
setopt null_glob typeset_silent

SCRIPT_DIR=${0:A:h}
SRC_DIR=${SCRIPT_DIR:h}
REPO_ROOT=${SRC_DIR:h}
RUBY_GENERATOR=${SCRIPT_DIR}/dict-generator.rb
SHELL_COMPRESSOR=${SCRIPT_DIR}/compress.sh
RUST_CDT=${RUST_CDT:-cdt}
DICT_SIZE=262144
SLICE_LENGTH=12
BLOCK_LENGTH=4096
MIN_FREQUENCY=3

samples=("$@")
if (( ${#samples} == 0 )); then
  samples=(
    ${REPO_ROOT}/blog.jxck.io/entries/2016-01-27/new-blog-start.html
    ${REPO_ROOT}/blog.jxck.io/entries/2020-01-24/background-fetch.html
    ${REPO_ROOT}/blog.jxck.io/entries/2025-11-10/group-vault.html
  )
fi

if (( ${#samples} == 0 )); then
  print -u2 -- "error: no samples provided"
  exit 1
fi

if [[ ! -f "${RUBY_GENERATOR}" ]]; then
  print -u2 -- "error: Ruby generator not found: ${RUBY_GENERATOR}"
  exit 1
fi

if [[ ! -f "${SHELL_COMPRESSOR}" ]]; then
  print -u2 -- "error: shell compressor not found: ${SHELL_COMPRESSOR}"
  exit 1
fi

if ! command -v "${RUST_CDT}" >/dev/null 2>&1; then
  print -u2 -- "error: missing ${RUST_CDT} on PATH"
  exit 1
fi

work_dir=$(mktemp -d "${TMPDIR:-/tmp}/cdt-parity.XXXXXX")
trap 'rm -rf "${work_dir}"' EXIT

dict_path="${work_dir}/shared.dict"
shell_out="${work_dir}/shell"
rust_out="${work_dir}/rust"
mkdir -p "${shell_out}" "${rust_out}"

decode_zstd() {
  local input="$1"
  local output="$2"
  zstd -q -f -d --patch-from="${dict_path}" "${input}" -o "${output}"
}

decode_dcz() {
  local input="$1"
  local output="$2"
  local raw="${work_dir}/payload.zstd"
  dd if="${input}" of="${raw}" bs=1 skip=40 status=none
  decode_zstd "${raw}" "${output}"
}

ruby "${RUBY_GENERATOR}" \
  -o "${dict_path}" \
  -s "${DICT_SIZE}" \
  -l "${SLICE_LENGTH}" \
  -b "${BLOCK_LENGTH}" \
  -f "${MIN_FREQUENCY}" \
  "${samples[@]}" >/dev/null

"${SHELL_COMPRESSOR}" \
  --dict "${dict_path}" \
  --output-dir "${shell_out}" \
  -br \
  -zstd \
  -dcb \
  -dcz \
  "${samples[@]}" >/dev/null

"${RUST_CDT}" compress \
  --dict "${dict_path}" \
  --output-dir "${rust_out}" \
  -br \
  -zstd \
  -dcb \
  -dcz \
  "${samples[@]}" >/dev/null

result=0
for sample in "${samples[@]}"; do
  rel=${sample#${REPO_ROOT}/}
  print -- "== ${rel}"

  for ext in br zstd dcb dcz; do
    shell_file="${shell_out}/${rel}.${ext}"
    rust_file="${rust_out}/${rel}.${ext}"

    if cmp -s "${shell_file}" "${rust_file}"; then
      print -- "  ${ext}: byte-identical"
    else
      print -- "  ${ext}: differs"
      if [[ "${ext}" == "zstd" ]]; then
        decoded="${work_dir}/decoded.zstd"
        decode_zstd "${rust_file}" "${decoded}"
        if cmp -s "${sample}" "${decoded}"; then
          print -- "    decode: compatible"
        else
          print -- "    decode: mismatch"
        fi
      fi
      if [[ "${ext}" == "dcz" ]]; then
        if cmp -s <(dd if="${shell_file}" bs=1 count=40 status=none) <(dd if="${rust_file}" bs=1 count=40 status=none); then
          print -- "    header: identical"
        else
          print -- "    header: differs"
        fi

        decoded="${work_dir}/decoded.dcz"
        decode_dcz "${rust_file}" "${decoded}"
        if cmp -s "${sample}" "${decoded}"; then
          print -- "    decode: compatible"
        else
          print -- "    decode: mismatch"
        fi
      fi
      result=1
    fi
  done
done

exit "${result}"
