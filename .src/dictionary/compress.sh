#!/usr/bin/env zsh

set -euo pipefail

DICT=""
OUT_DIR="./.src/dictionary/work/compressed"
VERBOSE=0
WANT_RAW_BR=0
WANT_RAW_ZSTD=0
WANT_DCB=0
WANT_DCZ=0

usage() {
  cat <<'EOF'
Usage: ./.src/dictionary/compress.sh [options] files...

Compress files with a generated raw dictionary.

Options:
  -d, --dict FILE        Raw dictionary file to use
  -o, --output-dir DIR   Output directory (default: ./.src/dictionary/work/compressed)
  -br, --raw-brotli      Emit raw Brotli stream (.br)
  -zstd, --raw-zstd      Emit raw Zstd stream (.zstd)
  -dcb, --delta-compression-brotli
                         Emit Brotli-based CDT payload (.dcb)
  -dcz, --delta-compression-zstd
                         Emit Zstd-based CDT payload (.dcz)
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

# 出力先が入力の親系ならその配下で相対化し、そうでなければ cwd 基準の相対構造を保つ。
relative_to_cwd() {
  local path="$1"

  local rel_to_out="${path#$OUT_DIR/}"
  if [[ "$rel_to_out" != "$path" ]]; then
    printf "%s\n" "$rel_to_out"
    return
  fi

  local rel="${path#$cwd/}"
  if [[ "$rel" == "$path" ]]; then
    printf "%s\n" "${path:t}"
    return
  fi

  printf "%s\n" "$rel"
}

# raw shared Brotli をそのまま出力する。
compress_brotli() {
  local input="$1"
  local output="$2"

  brotli -q 11 -w 24 -f --dictionary="$DICT" "$input" -o "$output"
}

# raw shared Zstd をそのまま出力する。
compress_zstd() {
  local input="$1"
  local output="$2"

  zstd -q -f -22 --ultra --long=23 --patch-from="$DICT" "$input" -o "$output"
}

# CDT payload は raw stream を作って fixed header を前置して完成させる。
emit_cdt() {
  local raw_ext="$1"
  local magic="$2"
  local input="$3"
  local out_base="$4"

  local tmp="${out_base}.tmp.${raw_ext}"
  local out="${out_base}.${raw_ext}"

  if [[ "$raw_ext" == "dcb" ]]; then
    compress_brotli "$input" "$tmp"
  else
    compress_zstd "$input" "$tmp"
  fi

  wrap_cdt "$magic" "$tmp" "$out"
  rm -f "$tmp"
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
    -br|--raw-brotli)
      WANT_RAW_BR=1
      shift
      ;;
    -zstd|--raw-zstd)
      WANT_RAW_ZSTD=1
      shift
      ;;
    -dcb|--delta-compression-brotli)
      WANT_DCB=1
      shift
      ;;
    -dcz|--delta-compression-zstd)
      WANT_DCZ=1
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

# 出力指定が無い場合は、従来どおり CDT の両形式を出す。
if (( WANT_RAW_BR == 0 && WANT_RAW_ZSTD == 0 && WANT_DCB == 0 && WANT_DCZ == 0 )); then
  WANT_DCB=1
  WANT_DCZ=1
fi

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

  # 入力の相対パス構造をそのまま出力先へ写す。
  rel_input="$(relative_to_cwd "$abs_input")"
  out_base="${OUT_DIR}/${rel_input}"
  mkdir -p "${out_base:h}"

  if (( VERBOSE )); then
    print -u2 -- "compressing ${rel_input}"
  fi

  # 出力指定は排他ではなく加算式なので、raw と CDT を混在指定できる。
  if (( WANT_RAW_BR )); then
    compress_brotli "$abs_input" "${out_base}.br"
  fi

  if (( WANT_RAW_ZSTD )); then
    compress_zstd "$abs_input" "${out_base}.zstd"
  fi

  if (( WANT_DCB )); then
    # CDT payload は raw stream を一旦作ってから fixed header を前置する。
    emit_cdt "dcb" "$dcb_magic" "$abs_input" "$out_base"
  fi

  if (( WANT_DCZ )); then
    emit_cdt "dcz" "$dcz_magic" "$abs_input" "$out_base"
  fi
done
