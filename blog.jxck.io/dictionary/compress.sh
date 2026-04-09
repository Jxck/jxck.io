#!/usr/bin/env zsh

set -euo pipefail

DICT=""
OUT_DIR="./blog.jxck.io/dictionary/work/compressed"
MODE="cdt"
VERBOSE=0

usage() {
  cat <<'EOF'
Usage: ./blog.jxck.io/dictionary/compress.sh [options] files...

Compress files with a generated raw dictionary.

Options:
  -d, --dict FILE        Raw dictionary file to use
  -o, --output-dir DIR   Output directory (default: ./blog.jxck.io/dictionary/work/compressed)
      --raw              Emit raw .br and .zstd streams
      --cdt              Emit RFC 9842 .dcb and .dcz payloads (default)
  -v, --verbose          Print progress information
  -h, --help             Show this help
EOF
}

abspath() {
  local path="$1"

  if [[ -d "$path" ]]; then
    (
      cd "$path"
      pwd
    )
    return
  fi

  local dir="${path:h}"
  local base="${path:t}"
  (
    cd "$dir"
    printf "%s/%s\n" "$PWD" "$base"
  )
}

while (( $# > 0 )); do
  case "$1" in
    -d|--dict)
      DICT="${2:-}"
      shift 2
      ;;
    -o|--output-dir)
      OUT_DIR="${2:-}"
      shift 2
      ;;
    --raw)
      MODE="raw"
      shift
      ;;
    --cdt)
      MODE="cdt"
      shift
      ;;
    -v|--verbose)
      VERBOSE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      print -u2 -- "error: unknown option: $1"
      usage >&2
      exit 1
      ;;
    *)
      break
      ;;
  esac
done

if [[ -z "$DICT" ]]; then
  print -u2 -- "error: dictionary file is required"
  usage >&2
  exit 1
fi

if (( $# == 0 )); then
  print -u2 -- "error: no input files"
  usage >&2
  exit 1
fi

DICT="$(abspath "$DICT")"
mkdir -p "${OUT_DIR:h}"
OUT_DIR="$(abspath "$OUT_DIR")"

if [[ ! -f "$DICT" ]]; then
  print -u2 -- "error: dictionary not found: $DICT"
  exit 1
fi

mkdir -p "$OUT_DIR"

cwd="$(pwd -P)"
dict_hash_hex="$(shasum -a 256 "$DICT" | awk '{print $1}')"
dcb_magic=$'\xff\x44\x43\x42'
dcz_magic=$'\x5e\x2a\x4d\x18\x20\x00\x00\x00'

wrap_cdt() {
  local magic="$1"
  local raw_file="$2"
  local out_file="$3"

  printf "%s" "$magic" > "$out_file"
  printf "%s" "$dict_hash_hex" | xxd -r -p >> "$out_file"
  cat "$raw_file" >> "$out_file"
}

for input in "$@"; do
  abs_input="$(abspath "$input")"
  if [[ ! -f "$abs_input" ]]; then
    print -u2 -- "error: input not found: $input"
    exit 1
  fi

  rel_input="${abs_input#$cwd/}"
  if [[ "$rel_input" == "$abs_input" ]]; then
    rel_input="${abs_input:t}"
  fi

  out_base="${OUT_DIR}/${rel_input}"
  mkdir -p "${out_base:h}"

  if (( VERBOSE )); then
    print -u2 -- "compressing ${rel_input}"
  fi

  if [[ "$MODE" == "raw" ]]; then
    brotli -q 11 -w 24 -f --dictionary="$DICT" "$abs_input" -o "${out_base}.br"
    zstd -q -f -22 --ultra --long=23 --patch-from="$DICT" "$abs_input" -o "${out_base}.zstd"
    continue
  fi

  tmp_br="${out_base}.tmp.br"
  tmp_zstd="${out_base}.tmp.zstd"

  brotli -q 11 -w 24 -f --dictionary="$DICT" "$abs_input" -o "$tmp_br"
  zstd -q -f -22 --ultra --long=23 --patch-from="$DICT" "$abs_input" -o "$tmp_zstd"

  wrap_cdt "$dcb_magic" "$tmp_br" "${out_base}.dcb"
  wrap_cdt "$dcz_magic" "$tmp_zstd" "${out_base}.dcz"

  rm -f "$tmp_br" "$tmp_zstd"
done
