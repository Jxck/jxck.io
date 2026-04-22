# Fixed Plan: Rust ベースの CDT Toolkit

## tldr

- `.src/cdt-toolkit/` に、将来そのまま別 repo 化できる self-contained な Rust package を作る
- 公開 CLI は `cdt dictionary` / `cdt compress` の 2 本に固定する
- 辞書生成は Ruby 版と byte parity 必須、圧縮はまず empirical に parity 可否を確認する
- Brotli / Zstd は C 公式実装 (libbrotli / libzstd) への FFI で直接使う
- site repo 側は `cdt` を PATH 経由で呼ぶだけにし、Makefile に Rust build 責務を持たせない

## 概要

現行の [dict-generator.rb](/Users/jxck/develop/jxck.io/.src/dictionary/dict-generator.rb) と [compress.sh](/Users/jxck/develop/jxck.io/.src/dictionary/compress.sh) を Rust に統合し、辞書生成と辞書付き圧縮を 1 つの `cdt` バイナリで完結できる toolkit として再実装する。

主目的は新しいアルゴリズムを試すことではなく、**既存のサイト運用を壊さずに置換できる実装を作ること**である。最優先は現行仕様との互換性、決定性、配信系との契合である。

同時にこの実装は最終的に `.src/cdt-toolkit/` ディレクトリ以下を**そのまま別リポジトリとして公開できる状態**で完結させる。extract は履歴を持ち越さず、ディレクトリをコピーして `git init` する方式で切り出す。

## 成功条件

- `cdt dictionary` が現行 `dict-generator.rb` と同じ入力条件で deterministic に辞書を生成できる
- 生成される `active.dict` の body が Ruby 版と byte-identical である
- `cdt dictionary` の所要時間が、同一 corpus で Ruby 版より速い
- `cdt compress` が現行 `compress.sh` と同じ出力構造で `.br` / `.zstd` / `.dcb` / `.dcz` を生成できる
- `.dcb` / `.dcz` に入る dict hash が、現行配信系 ([dcb.rb](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb)) の期待値と契合する
- `make dict` / `make comp` / `make clean` が、環境にインストール済みの `cdt` を PATH 経由で呼ぶ形で通る
- `.src/cdt-toolkit/` 配下だけで `cargo build`, `cargo test`, release workflow, README, LICENSE, NOTICE, `.gitignore` が完結する
- `.src/cdt-toolkit/` 配下の README / LICENSE / workflow / comments に jxck.io / blog.jxck.io / `.mruby.handler` / 現行 Ruby / shell 実装への言及が無い
- `tests/fixtures/entries/` 配下の HTML corpus は、Ruby 版との byte parity 検証および realistic な corpus 上での挙動確認のため、blog 由来の実データを含むことを明示的に許容する (非依存性 grep の対象外)
- `.src/cdt-toolkit/` をコピーして `git init` した新 repo で `cargo test` が通り、第三者が利用できる
- macOS arm64 / macOS x86_64 / Linux x86_64 向けに prebuilt binary の release artifact (`.tar.gz`) を作成できる
- 本番 extract 前に extract rehearsal (throwaway repo での release workflow 実回し) で標準 runner 上の C toolchain build が通ることを確認できている

## 非目標

- 初手で辞書生成アルゴリズムを改善すること
- 初手で multi-dictionary (`entries`, `js`, `css`) へ拡張すること
- 初手で `.mruby.handler/dcb.rb` の配信条件を変えること
- 初手で site repo から別 repo へ抽出すること

## 言語選択

Rust を採用する。圧縮プリミティブ呼び出しは実装全体の一部にすぎず、残り大半を占める sliding window 処理, heap 選択, HashMap 集計, file I/O, error handling, CLI 層では Rust の型システムと所有権が決定性・安全性・ergonomics の面で優位である。libbrotli / libzstd は FFI 経由で直接利用するため、「C 実装に寄せる」要件は Rust からでも満たせる。

## CLI 方針

canonical な CLI は subcommand 方式とし、以下の 2 本に固定する。

- `cdt dictionary` — raw shared dictionary を生成する
- `cdt compress` — raw dictionary を使って `.br` / `.zstd` / `.dcb` / `.dcz` を生成する

公開 `hash` コマンドは作らない。SHA-256 の raw / base64 / hex は内部実装として持てば十分である。

`cdt --dictionary-generate ...` のような top-level long option style は、必要になった場合に alias として追加してよいが、正本の CLI にはしない。

初期 option は現行互換を優先する。

- `cdt dictionary`: `-o`, `-d`, `-s`, `-l`, `-b`, `-f`, `-v`
- `cdt compress`: `--dict`, `--output-dir`, `-br`, `-zstd`, `-dcb`, `-dcz`, `-v`

crate 名は `cdt-toolkit`、bin 名は `cdt` とする。

```toml
[package]
name = "cdt-toolkit"

[[bin]]
name = "cdt"
```

## 配置方針

実装は `.src/cdt-toolkit/` に置く。site repo 内にあるが、役割は将来別 repo に切り出す前提の self-contained package である。

初期構成 (site repo 内):

```text
.src/cdt-toolkit/
  Cargo.toml
  README.md
  LICENSE
  NOTICE
  THIRD_PARTY_LICENSES/
  .gitignore
  src/
    main.rs
    cli.rs
    dictionary/
    compress/
    ffi/
    io.rs
    error.rs
  tests/
    dictionary_parity.rs
    compress_parity.rs
    fixtures/
      entries/
  scripts/
    check.sh
  .github/
    workflows/
      ci.yml        # post-extract: PR / push 時の cargo check / test / clippy
      release.yml   # post-extract: tag push で prebuilt binary をリリース
```

加えて site repo root 側に pre-extract CI 用の workflow を置く:

```text
<site repo root>/
  .github/
    workflows/
      cdt-toolkit-ci.yml   # pre-extract: .src/cdt-toolkit/** 変更で cargo check / test / clippy
```

配置上の要点:

- 生成物は単一バイナリ `cdt` 1 本
- ライセンスは `LICENSE` に MIT 本文、依存ライブラリの著作権表示は `NOTICE` / `THIRD_PARTY_LICENSES/` に同梱する
- `.gitignore` には最低限 `target/` を含め、site repo 側に Rust build artifact をコミットしない
- `tests/fixtures/entries/` には blog の `entries/**/*.html` から抜粋した HTML corpus を同梱する (parity 検証用途で blog 由来実データを含むことを許容する)
- 現行 `.src/dictionary/work/check.sh` は `scripts/check.sh` として package 側へ移す

## Workflow 配置方針 (2 層配置)

GitHub Actions は repository root の `.github/workflows/` のみを実行対象とする制約があるため、`.src/cdt-toolkit/.github/workflows/` は extract 前は動かない。そのため 2 層配置を取る。

### Pre-extract: site repo root 側

- `.github/workflows/cdt-toolkit-ci.yml`
  - トリガ: `.src/cdt-toolkit/**` 配下への変更
  - 内容: `cargo check` / `cargo test` / `cargo clippy`
  - 目的: site repo 開発中に parity 退行を検出する開発 CI

### Post-extract: `.src/cdt-toolkit/.github/workflows/` 側

extract して新 repo の root になってから初めて active になる。

- `ci.yml`
  - トリガ: PR / push
  - 内容: `cargo check` / `cargo test` / `cargo clippy`
  - 目的: extract 後の CI gate (root 側 workflow が失われる分の補填)
- `release.yml`
  - トリガ: tag push (`v*`)
  - 内容: macOS arm64 / macOS x86_64 / Linux x86_64 向けに prebuilt binary をビルドし、`.tar.gz` artifact として GitHub Releases に上げる
  - 目的: 第三者配布

subdir 側 `ci.yml` と root 側 `cdt-toolkit-ci.yml` は内容が実質同じになるが、extract 後の連続性のための補填なので重複は許容する (ファイルサイズが小さく、同期ズレも致命的ではない)。

### Release workflow の事前検証 — extract rehearsal

`release.yml` は extract 前に実行できない (tag は extract 後の新 repo でしか切らない)。そのため Phase 5 の「標準 runner で libbrotli / libzstd の C toolchain ビルドが通ること」は **extract rehearsal** で検証する。

手順:

1. `.src/cdt-toolkit/` を scratch dir にコピー (`target/` は除外), `git init`
2. throwaway GitHub repo に push
3. 試験用 tag (`v0.0.0-rehearsal.N` など) を打ち、subdir の `release.yml` を実際に動かす
4. `.tar.gz` artifact の生成と、展開後の `cdt --help` / `cdt dictionary` / `cdt compress` が動くことを確認
5. throwaway repo を削除

この rehearsal は Phase 5 の出口条件とする。本番 extract (Phase 7) の前に workflow の動作が担保される。

## 実装原則

### 1. 移行中は旧実装を oracle として残す

以下は移行完了まで残す。

- `.src/dictionary/dict-generator.rb`
- `.src/dictionary/compress.sh`
- `.src/dictionary/hash.rb`
- `.src/dictionary/work/check.sh`

Rust 実装の correctness は、まず旧実装との差分比較で担保する。旧実装の削除は parity 検証と build 切替完了後 (Phase 6) に行う。

### 2. 辞書生成は byte parity を必須とする

`cdt dictionary` は最終的に Ruby 版と同じ辞書 bytes を生成する必要がある。理由は圧縮率ではなく、配信系が辞書本体の SHA-256 に依存しているためである。

[dcb.rb](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) は `active.dict` の body から SHA-256 raw bytes を計算し、base64 化した値を `Available-Dictionary: :HASH:` と比較している。`active.dict` の body が 1 bit でも変わると配信条件が崩れる。

### 3. 圧縮は現行 wire format を維持する

`cdt compress` は現行 [compress.sh](/Users/jxck/develop/jxck.io/.src/dictionary/compress.sh) の wire format を維持する。

- `.br`: 辞書付き Brotli raw stream
- `.zstd`: 現行 `--patch-from` 相当の Zstd stream
- `.dcb`: `ff 44 43 42` + dict SHA-256 raw 32 bytes + Brotli stream
- `.dcz`: Zstd skippable frame + Zstd stream

`.dcz` の先頭 8 bytes `5e 2a 4d 18 20 00 00 00` は little-endian で:

- `0x184D2A5E` — skippable frame magic
- `0x00000020` — user data length 32

を意味する。つまり `.dcz` は「dict SHA-256 raw 32 bytes を user data に入れた skippable frame + 通常の zstd stream」という構造である。Rust 側では skippable frame を raw bytes で前置すればよい。

`.dcb` の `ff 44 43 42` は Chrome CDT 用の ad-hoc prefix であり、Brotli format そのものの一部ではない。こちらも Rust 側で raw bytes を先頭へ置く。

### 4. Brotli / Zstd parity は empirical に先に確認する

最初から「bitstream parity は無理」と決め打ちしない。Phase 3 の早い段階で、CLI 実装と Rust 実装の出力を直接比較する。

- parity が取れるなら、Brotli / Zstd も byte parity を合格条件へ引き上げる
- parity が取れないなら、decode compatibility + header correctness を合格条件にする

これにより本来取れたはずの保証を不用意に捨てない。

### 5. 決定性は実装上の制約として明文化する

Rust 実装では以下を明示的に制御する。

- file list は realpath 化後に相対パス昇順で sort する
- 中間データは `HashMap` の iteration order に依存しない
- 順序が必要な箇所は `BTreeMap` か `Vec + sort` で表現する
- heap の tie-break は Ruby 実装と同じ順で比較する

現行 Ruby 実装は path sort と比較順で決定性を作っているため、これを写経しないと byte parity は取れない。

### 6. 性能は Phase 2 の出口条件に含める

単純実装で parity だけ取り、あとから性能を考える進め方は取らない。Phase 2 の段階で、**同一 corpus に対して Ruby 版より速いこと**を出口条件とする。parity は取れるが明確に遅い場合は Phase 3 へ進まず、Phase 2 内で heap / sliding window / 並列化等の最適化を前倒しする。

測定プロトコル (Codex Review #1 への答え):

- 対象 corpus: `blog.jxck.io/entries/**/*.html` の全量 (site repo 側で測る。package 側の `tests/fixtures/entries/` では規模が小さく有意差が出ないため)
- 計測コマンド: site repo 側の固定スクリプト `.src/dictionary/bench.sh` が Ruby 版 / Rust 版を同一 option set (`-s 262144 -l 12 -b 4096 -f 3`) で実行し、`/usr/bin/time -p` の real time を採取する
- 回数: cold 1 回を捨て、warm で 5 回計測、中央値を代表値とする
- 合格ライン: Rust 版の中央値 real time が Ruby 版の中央値 real time を下回ること (比率は問わず、単に下回れば可)
- 実行環境: 開発者 local でよい。CI 上での再現は要求しない (ノイズが大きくゲートに使えないため)

### 7. site repo 側は `cdt` を PATH 経由で呼ぶだけ

site repo は `cdt` の build 責務を持たない。Makefile は PATH 解決で `cdt` を呼び、`cargo build` を実行しない。絶対パス (`.src/cdt-toolkit/target/release/cdt`) にも依存しない。

2 相の運用を前提とする。

- **開発期**: 開発者が `.src/cdt-toolkit/` 配下で `cargo install --path .` を一度実行し、local 環境 (`$CARGO_HOME/bin`) に `cdt` を入れる
- **運用期 (extract 後)**: 新 repo の GitHub Releases から prebuilt binary をインストールする

どちらの相でも site repo 側の Makefile 呼び出しは同一 (`cdt dictionary ...`, `cdt compress ...`) に揃える。未インストール時は `command -v cdt` 相当の事前チェックで検出し、`.src/cdt-toolkit/README.md` (extract 後は新 repo の README) を参照するよう促すメッセージを出す。README をインストール手順の single source of truth とすることで、pre-extract / post-extract で文言を分岐しなくても extract 後に案内先が壊れない (Codex Review #2 への答え)。

### 8. `.src/cdt-toolkit/` の非依存性 (fixture 例外つき)

package 配下は原則として jxck.io 非依存で構成する。以下は package 内に含めない。

- README / LICENSE / CONTRIBUTING に jxck.io, blog.jxck.io, `.mruby.handler`, 現行 Ruby / shell 実装への言及
- コード comment に site 固有文脈
- workflow 定義内の site 固有値 (repo 名等)

ただし `tests/fixtures/entries/` は blog 由来の実 HTML を含む。これは parity 検証のために realistic な CDT 対象ファイルが必要なためであり、toolkit の公開性を損なう扱いはしない。extract 後の新 repo でもこの corpus は残し、自己完結した parity test を保つ。

runtime の site 側 integration (`.mruby.handler/dcb.rb` との契合確認, `make dict` / `make comp` の回帰) は package 側に持ち込まず、site repo 側 script として残す。

設計思想の記述は CDT / shared dictionary 一般の話に限定する。

## 実装フェーズ

### Phase 1: Package scaffold

- `.src/cdt-toolkit/` を新規作成
- `Cargo.toml` に package metadata (name=`cdt-toolkit`, bin=`cdt`, license=`MIT`) と最小依存を記述
- `.gitignore` に `target/` を含める
- `README.md` / `LICENSE` (MIT) / `NOTICE` / `THIRD_PARTY_LICENSES/` を作成する
- `clap` ベースで `dictionary` / `compress` subcommand を定義する
- 共通 error type, path 正規化, verbose logger を実装する
- `src/ffi/brotli.rs` / `src/ffi/zstd.rs` の skeleton を置く
- `tests/fixtures/entries/` に blog の `entries/**/*.html` から抜粋した HTML corpus を配置する
- `scripts/check.sh` に現行 `.src/dictionary/work/check.sh` を移す
- subdir 側 `.github/workflows/` に post-extract 用の `ci.yml` / `release.yml` skeleton を配置する (site repo 内では実行されない)
- site repo root 側 `.github/workflows/cdt-toolkit-ci.yml` を追加し、pre-extract CI を有効化する
- `cargo run -- --help` が通る状態にする

この段階では site 側 Makefile は切り替えない。

### Phase 2: `cdt dictionary` の parity 実装

Ruby 実装の以下を Rust に移植する。

- file list 正規化 (argv → realpath → 相対パス sort)
- document frequency 集計
- active score 管理
- sliding window score 計算
- max-heap による block 選択
- trim / overlap subtraction
- source-order concatenate
- SHA-256 hex filename 出力

検証:

- package 側 integration test: `tests/fixtures/entries/` の HTML corpus で `cdt dictionary` が deterministic に辞書を生成し、Ruby 版と byte-identical
- site repo 側: blog 全体 corpus に対して Ruby 版と byte-identical かつ Ruby 版より速い
- `scripts/check.sh` 相当の性質検証を通す

出口条件:

- correctness (byte parity)
- determinism (再実行で同一 bytes)
- performance (Ruby 版より速い)

の 3 点が揃うこと。Ruby 版に速度で負ける場合は Phase 3 へ進まず Phase 2 内で最適化する。

### Phase 3: `cdt compress` の parity 実装

Rust 側で以下を実装する。

- dict body 読込
- SHA-256 raw / hex / base64 計算
- output path 解決
- Brotli 圧縮 (libbrotli FFI)
- Zstd 圧縮 (libzstd FFI)
- `.dcb` / `.dcz` header wrapping

圧縮ライブラリ方針:

- **Brotli**: Google の libbrotli を FFI で直接利用。第一候補は既存 sys crate (`brotli-sys` / `brotlic-sys`)。Phase 3 の empirical check で問題が出た場合は `vendor/brotli/` にソースを取り込み `build.rs` + cc crate で自前 FFI に落とす
- **Zstd**: Facebook の libzstd を FFI で直接利用 (`zstd` crate / 内部 `zstd-sys` 経由)
- pure-Rust port (`dropbox/rust-brotli` 系) は採用しない

#### Early empirical check

最小 fixture 1 本で以下を確認する。

- `brotli -q 11 -w 24 --dictionary=D input` と Rust 実装出力を比較
- `zstd -22 --ultra --long=23 --patch-from=D input` と Rust 実装出力を比較

byte-identical が取れるならその時点で Brotli / Zstd も parity を正式な合格ラインへ引き上げる。取れない場合に限り、decode compatibility + header correctness を合格ラインに落とす。

#### 検証

- `.dcb` の先頭 36 bytes が `ff 44 43 42` + dict SHA-256 raw 32 bytes と一致
- `.dcz` の skippable frame 内 32 bytes が dict SHA-256 raw と一致
- `.dcb` / `.dcz` の payload が decoder で復元できる
- output file path / layout が shell 版と一致

### Phase 4: site build 統合 (PATH 経由)

site repo 側 Makefile は `cdt` を PATH 解決で呼ぶ形に切り替える。`cargo build` は Makefile に含めない。

- Makefile は `cdt dictionary ...` / `cdt compress ...` を絶対パス無しで呼ぶ
- 未インストール時は Makefile 冒頭で `command -v cdt` 相当の事前チェックを入れ、`.src/cdt-toolkit/` 配下で `cargo install --path .` を案内するエラーメッセージを出す
- 開発者は事前に `.src/cdt-toolkit/` 配下で `cargo install --path .` を 1 回実行する
- CI / 本番 build 環境は provisioning 段で prebuilt binary をインストールする

この段階で以下を Rust 実装へ切り替える。

- `DICT_GENERATOR`
- `.html.dcb` pattern rule
- 必要なら `work/check.sh`

検証:

- `make dict`
- `make comp`
- `make clean`

が、環境にインストール済みの `cdt` を呼ぶ形で通ること。

### Phase 5: 配布 (release workflow 整備 + extract rehearsal)

subdir 側 `.github/workflows/release.yml` を整備し、extract rehearsal で動作確認する。workflow 内は site repo 固有値を埋め込まず、`github.repository` 等の generic な参照に寄せる。

Release workflow 仕様:

- **Trigger**: tag push (`v*` パターン)
- **Artifact 形式**: `.tar.gz`
- **チェックサム**: `.tar.gz` ごとに SHA-256 を release に同梱
- **対象 target**:
  - macOS arm64 (`aarch64-apple-darwin`)
  - macOS x86_64 (`x86_64-apple-darwin`)
  - Linux x86_64 (`x86_64-unknown-linux-gnu`)
- **Runner**: `macos-latest` / `ubuntu-latest` 標準 runner (C toolchain は標準搭載を前提)
- **同梱物**: `cdt` binary, `LICENSE`, `NOTICE`, `THIRD_PARTY_LICENSES/`, `README.md`

Extract rehearsal による動作検証:

1. `.src/cdt-toolkit/` を scratch dir にコピー (`target/` は除外), `git init`
2. throwaway GitHub repo に push
3. 試験用 tag を打ち、`release.yml` を実際に動かす
4. `.tar.gz` 生成と、展開後の `cdt --help` / `cdt dictionary` / `cdt compress` が動くことを確認
5. throwaway repo を削除

出口条件:

- `release.yml` の内容が subdir 側に置かれている
- rehearsal で 3 target すべての `.tar.gz` artifact が生成される
- rehearsal で展開した binary が動作する

`cargo-dist` は採用候補として残すが、初手の正本にはしない。まずは手書き workflow で release artifact が安定して出せることを優先する。

### Phase 6: 旧実装削除

以下の条件が揃った後で、旧 Ruby / shell 実装を削除する。

- `cdt dictionary` parity 完了
- `cdt compress` parity または十分な empirical compatibility 完了
- site build が PATH 経由 `cdt` 呼び出しで通る
- Phase 5 の extract rehearsal で release workflow が通っている

削除対象:

- `.src/dictionary/dict-generator.rb`
- `.src/dictionary/compress.sh`
- `.src/dictionary/hash.rb`
- `.src/dictionary/work/check.sh` (package 側 `scripts/check.sh` に統合済み)

### Phase 7: 別 repo への extract (本番)

`.src/cdt-toolkit/` をそのまま別 repo として公開する。履歴は持ち越さない。Phase 5 の rehearsal と違って throwaway ではなく本番 repo に push する。

手順:

1. `.src/cdt-toolkit/` 配下を site repo 外の別ディレクトリにコピー (`target/` は除外)
2. コピー先で `git init`, `git add .`, 初回 commit (commit message は site 固有文脈を含めない)
3. GitHub 上に新 repo (本番) を作成し push
4. 本番 release tag (`v0.1.0` など) を打ち、subdir の `release.yml` で prebuilt binary artifact を生成
5. site repo 側で `.src/cdt-toolkit/` を削除する
6. site repo 側 root の `.github/workflows/cdt-toolkit-ci.yml` も削除する (対象が消えたため)
7. site repo 側は既に PATH 経由で `cdt` を呼ぶ設計なので、Makefile の修正は不要
8. 開発者 / CI 環境の `cdt` 取り込み経路を、新 repo の GitHub Releases prebuilt binary へ切り替える

extract 先の repo は `git init` 直後の clean history から開始する。

## 依存方針

依存は必要最小限に留める。

- CLI: `clap`
- hash: `sha2`
- base64: `base64`
- Brotli FFI: `brotli-sys` / `brotlic-sys` 系 sys crate (第一候補), 問題があれば自前 FFI + `cc` crate に落とす
- Zstd FFI: `zstd` crate (内部で libzstd を vendor 済み)
- tests: `tempfile`

file enumeration は shell で argv 展開済み前提とするため、`walkdir` / `glob` は入れない。

`hex` crate は入れない。hex 文字列化は標準的な小実装で済む。

並列化 (`rayon`) は Phase 2 の性能要件を満たすために必要な場合にのみ導入する。まず correctness と determinism を優先する。

## 検証項目

### 1. 辞書生成の性質 (package 配下)

- document frequency が file count である
- file boundary をまたがない
- trim が効く
- overlap subtraction が効く
- size cap を守る
- deterministic である
- Ruby 版と byte-identical である

検証は `tests/fixtures/entries/` の HTML corpus に対して行う。

### 2. 配信系との契合 (site repo 側)

- `active.dict` body の SHA-256 raw bytes が Ruby 版と一致
- base64 化した値が `.mruby.handler/dcb.rb` の `Available-Dictionary` 期待値と一致
- `.dcb` / `.dcz` に格納する hash raw bytes が `active.dict` 由来で一致

この検証は runtime 配信系への依存があるため、site repo 側のスクリプトとして置く。`.src/cdt-toolkit/` 配下には持ち込まない。

### 3. 圧縮互換

- `.br`, `.zstd`, `.dcb`, `.dcz` が decoder で復元できる
- output path / file name / layout が現行と一致
- parity が取れる場合は byte-identical

### 4. build regression (site repo 側)

- `make dict`
- `make comp`
- `make clean`

環境にインストール済みの `cdt` を PATH 経由で呼ぶ形で通ること。

### 5. package 独立性

- `.src/cdt-toolkit/` 配下だけで `cargo build`, `cargo test`, release workflow が閉じる
- `tests/fixtures/entries/` は設計判断として blog 由来コンテンツを含むため grep 対象外とする。それ以外の README / LICENSE / workflow / comments / コード / scripts に jxck.io / blog.jxck.io / `.mruby.handler` / 現行 Ruby / shell 実装への言及が無いことを grep で確認する
- `.src/cdt-toolkit/` を別ディレクトリにコピーし `git init` した状態で `cargo test` が通る
- release artifact (`.tar.gz`) から展開した `cdt --help` が動く
- 展開した binary で `cdt dictionary` / `cdt compress` が通る

### 6. release workflow の動作 (Phase 5)

- subdir の `release.yml` が `macos-latest` / `ubuntu-latest` 標準 runner で libbrotli / libzstd を含むビルドを通す
- 3 target (`aarch64-apple-darwin`, `x86_64-apple-darwin`, `x86_64-unknown-linux-gnu`) すべての `.tar.gz` artifact が生成される
- 上記は extract rehearsal (throwaway repo) で実機確認する

## 着手順

1. `.src/cdt-toolkit/` を作り、CLI 骨格 / README / LICENSE / NOTICE / `.gitignore` / HTML corpus / `scripts/check.sh` / subdir workflow skeleton を入れる
2. site repo root に `.github/workflows/cdt-toolkit-ci.yml` を追加して pre-extract CI を有効化する
3. `cdt dictionary` を parity 重視で実装し、HTML corpus で byte parity と性能 (Ruby より速い) を達成する
4. `cdt compress` を実装し、wire format と header を合わせる
5. early empirical check で Brotli / Zstd parity の可否を確定する
6. subdir の `release.yml` を整備し、extract rehearsal (throwaway repo に push → tag push → workflow 実回し → artifact 確認 → rehearsal repo 削除) で動作検証する
7. 開発環境に `cargo install --path .src/cdt-toolkit` で `cdt` を入れる
8. site repo 側 Makefile を PATH 経由呼び出しに切り替える
9. `.src/cdt-toolkit/` 単体で公開可能な状態を確認する (非依存性 grep, `git init` コピーで `cargo test` 通過)
10. 旧 Ruby / shell 実装を削除する
11. `.src/cdt-toolkit/` をコピーし `git init` で別 repo (本番) 化して push、本番 release tag を打ち、prebuilt binary 取得経路を新 repo へ切り替える
12. site repo root の `.github/workflows/cdt-toolkit-ci.yml` を削除する (対象が消えたため)

## Phase 着手時の実装判断項目

全体方針は確定済み。以下は Phase 着手時に Implementation detail として決定する。

- Phase 1 着手時: `NOTICE` / `THIRD_PARTY_LICENSES/` に記載する libbrotli / libzstd / `clap` / `sha2` / `base64` / `tempfile` の著作権表示の具体文面
- Phase 3 着手時: Brotli sys crate (`brotli-sys` vs `brotlic-sys`) のどちらが辞書付き圧縮 API を露出しているかの確認結果
- Phase 5 着手時: extract rehearsal で実際に workflow を動かし、`macos-latest` / `ubuntu-latest` 標準 runner で libbrotli / libzstd の vendored source ビルドが通ることを実機検証

## Review by Codex

### Findings

1. 成功条件と Phase 2 の出口条件にある「Ruby 版より速い」は、現状の文面だと判定方法が未定義です。対象 corpus は書かれていますが、1 回計測なのか複数回の中央値なのか、cold/warm cache をどう扱うのか、どのコマンド列で比較するのかが無く、実装者が benchmark ルールを勝手に決めることになります。ここは plan として未決です。最低でも「site repo 側の固定スクリプトで同一 corpus を N 回測り、中央値で Ruby 版を下回ること」のように測定プロトコルを固定しないと、Phase 2 の完了判定がぶれます。

2. Phase 4 の未インストール時メッセージは「`.src/cdt-toolkit/` 配下で `cargo install --path .` を案内する」となっていますが、Phase 7 の extract 後はそのパス自体が存在しません。一方で同じ節では運用期の導入経路を prebuilt binary に寄せると書かれており、エラーメッセージ方針が pre/post-extract で分岐していません。site repo 側 Makefile の install hint は、少なくとも「site repo 内包期」と「extract 後」で別文言にするか、あるいは常に汎用的な install docs URL を指す形に寄せる必要があります。今のままだと extract 後に古い導線を表示します。

### Summary

大枠は実装可能です。残る未決は、Phase 2 の性能判定プロトコルと、extract 前後での `cdt` 未導入時の案内導線です。この 2 点が埋まれば、実装準備としては十分に decision complete です。

## Review by Claude (実装レビュー)

Fixed Plan に基づく `.src/cdt-toolkit/` 初期実装 (Phase 1 scaffold + Phase 2/3 初期) に対するレビュー。ディレクトリ構成・FFI wrapper・Makefile の PATH 経由切替などの骨格はプランどおりだが、プランの成功条件・実装原則に照らして未達項目が残っている。

### Must-fix (プラン成功条件/実装原則の違反)

1. **`src/cli.rs:43` — `compress --output-dir` のデフォルトが site repo 固有**

    ```rust
    #[arg(..., default_value = "./.src/cdt-toolkit/work/compressed")]
    pub output_dir: PathBuf,
    ```

    実装原則 #8 違反。extract 後は `.src/cdt-toolkit/` パス自体が存在しない。`./work/compressed` 等に変更する必要がある。

2. **`Makefile` の `CDT_INSTALL_HINT` が extract 後に壊れる**

    ```makefile
    CDT_INSTALL_HINT ?= cargo install --path .src/cdt-toolkit
    ```

    これは Codex Review finding #2 で指摘されたまま Fixed Plan に Answer が書かれずに残った未解消事項。site repo 内包期と extract 後で分岐するか、install docs URL に寄せる必要がある。

3. **Ruby 版との byte parity 検証が未実装**

    `tests/dictionary_parity.rs` は名前に反し「`cdt` を同一引数で 2 回呼んで出力比較」の自己 determinism 検証しかない。プラン成功条件「`active.dict` body が Ruby 版と byte-identical」および Phase 2 出口条件「byte parity」を検証する harness (Ruby 実装を oracle として回し SHA-256 比較) が存在しない。

4. **Phase 2 の性能判定プロトコル未実装**

    Codex Review finding #1 (「Ruby 版より速い」の判定方法未定義) は Fixed Plan でも未定義のままで、実装側にもベンチ harness が無い。

5. **`THIRD_PARTY_LICENSES/` が空ディレクトリ、`NOTICE` が placeholder**

    プラン「Phase 着手時の実装判断項目」の Phase 1 項目で「`NOTICE` / `THIRD_PARTY_LICENSES/` に記載する libbrotli / libzstd / `clap` / `sha2` / `base64` / `tempfile` の著作権表示の具体文面」を決めるとしていたが未実施。extract 可能状態の前提が崩れている。

6. **`LICENSE:3` — copyright holder 名が空**

    `Copyright (c) 2026` のみで holder 不在。MIT は `Copyright (c) YEAR NAME` が慣例で、extract 時の帰属が不明瞭。

7. **`release.yml` がアーカイブを作っていない**

    現状の `.src/cdt-toolkit/.github/workflows/release.yml` は `cargo build --release` のみ。プラン Phase 5 が求める「`.tar.gz` artifact」「SHA-256 同梱」「`cdt` binary + `LICENSE` + `NOTICE` + `THIRD_PARTY_LICENSES/` + `README.md` を同梱」「GitHub Releases に上げる」の step が一切無い。このままでは Phase 5 の extract rehearsal が出口条件を満たさない。

### 重要 (バグ / 仕様逸脱一歩手前)

8. **`src/dictionary/mod.rs:360` — 使われない base64 計算 + 未使用 `base64` crate**

    ```rust
    let _sha256_base64 = base64::engine::general_purpose::STANDARD.encode(sha256_digest);
    ```

    Ruby 版は verbose 出力で `sha256: :#{sha256_base64}:` を stderr に出すが、Rust 版は verbose 出力自体を持たず base64 は計算して捨てるだけ。`Cargo.toml` の `base64` 依存が実質死んでいる。verbose 出力実装 (Ruby parity 寄り) か完全削除のどちらかで整理する。

9. **`Cargo.toml` — 依存重複・未使用**

    - `zstd = "0.13.3"` が未使用 (実際使っているのは `zstd-safe` のみ)
    - `tempfile` が `[dependencies]` と `[dev-dependencies]` 両方に記載 (tests 専用なので dev のみでよい)

10. **`scripts/check.sh:35` — 「自己完結パッケージ」内で `ruby -e` 依存**

    ```sh
    expect_equal "$(ruby -e 'print File.binread(ARGV[0])' "${...}")" "WXYZ" ...
    ```

    Ruby 排除を目的としたパッケージが検証スクリプトで ruby を要求している。macOS は同梱だが Linux runner では保証されない。`cmp` / `od` / 直接 shell redirect に置換推奨。

11. **`src/compress/mod.rs:80` — `path.display()` 経由でパス組み立て (lossy)**

    ```rust
    PathBuf::from(format!("{}.{}", path.display(), suffix))
    ```

    non-UTF-8 パスで U+FFFD 化する。`OsString::push` で組むのが正解。実用上 macOS では問題化しにくいが、厳密性の問題。

### 中位 (読みやすさ / 保守性)

12. `src/main.rs:5-8` — `mod ffi { pub mod brotli; pub mod zstd; }` を main.rs 内に inline 宣言。慣例的には `src/ffi/mod.rs` を置くほうが読みやすい。
13. `src/compress/mod.rs:65` の `relative_to_cwd_or_out` と `src/io.rs:6` の `relative_path` が近い責務で別実装に分岐。compress 側の `cwd` 基準 fallback は `io::relative_path` を呼べば足りる。
14. `src/dictionary/mod.rs:169` — `HashMap<K, bool>` が `HashSet<K>` の代用。`HashSet::insert` の戻り値 bool を使うほうが自然。
15. `Cargo.toml` に `rust-version` 未指定。`edition = "2024"` は Rust 1.85+ 必須で、ambient の古い toolchain (実例: site repo 上の `~/.cargo/bin/rustc` 1.83.0) では即エラー。`rust-version = "1.85"` を明記すると MSRV 違反が伝わる。
16. `Cargo.toml:7` の `repository = "https://example.invalid/cdt-toolkit"` は placeholder。Phase 1 scaffold 許容だが Phase 7 extract 前の差し替え TODO として記録。

### アルゴリズム parity 観察

`src/dictionary/mod.rs:270` — slice_id 割当順が Ruby と異なる。

- Ruby: `document_frequency.each` は Hash 挿入順 (= ファイル走査時の初出順)
- Rust: `qualifying.sort_by(|l, r| l.0.cmp(&r.0))` で slice bytes の lex order

slice_id 値は heap tie-break (`(score, file_index, position)`) に関与せず、アルゴリズム上は最終 dictionary bytes が一致する**はず**。ただし、これは実装者の主張であって実測ではない。Must-fix #3 (Ruby 版 parity test) で実測検証する必要がある。

### 良い点

- FFI wrapper の resource cleanup (brotli encoder / prepared dictionary) が失敗パスまで含めて正しい
- `canonicalized_inputs` が realpath + 相対パス sort で決定性を作っている (実装原則 #5)
- `compress.run()` で `-dcb` / `-dcz` デフォルト自動有効化が `compress.sh:186` と同じ
- CLI short flag 選択 (`-b`/`-z` for raw, `--delta-compression-*` for CDT) は clap 制約下の合理的妥協
- 2 層 workflow 配置 (`.github/workflows/cdt-toolkit-ci.yml` + subdir `ci.yml`/`release.yml`) はプランどおり

### 次の打ち手 (優先順)

1. Makefile `CDT_INSTALL_HINT` を汎用化 (Codex 指摘の解消)
2. `src/cli.rs:43` の `--output-dir` デフォルトを site repo 非依存に
3. Ruby 版 oracle との byte parity test 追加
4. 性能判定プロトコル固定 (plan 追記 → site repo 側 script 化)
5. `THIRD_PARTY_LICENSES/` 実体化と `LICENSE` holder 記入
6. `release.yml` に archive + SHA-256 + release upload step 追加
7. 未使用依存 (`zstd`, `base64`, 重複 `tempfile`) 整理
8. `scripts/check.sh` から ruby 呼び出し除去

1〜4 はプラン成功条件に直結、5〜6 は Phase 5 extract rehearsal の前提、7〜8 はクリーンアップ。

## 実装ログ (2026-04-22 — Review 後のフォローアップ)

上の 2 つの Review (Codex / Claude) 指摘を一通り解消した回の作業記録。

### 1. 指摘と対応の対応表

#### Codex Review findings

| # | 指摘 | 対応 |
| - | ---- | ---- |
| 1 | Phase 2 「Ruby 版より速い」の測定プロトコル未定義 | プラン「実装原則 #6」に測定プロトコル節を追記 (blog 全量 corpus / cold 1 回捨て / warm 5 回 / real time 中央値 / Rust 中央値が Ruby 中央値を下回れば可 / 実行は local でよく CI は要求しない) |
| 2 | Makefile install hint が extract 後に壊れる | `CDT_INSTALL_HINT` 変数を廃止し、未導入時メッセージを `.src/cdt-toolkit/README.md` 参照に寄せた。README を single source of truth とすることで pre/post-extract で分岐不要に |

#### Claude Review (Must-fix)

| # | 指摘 | 対応 |
| - | ---- | ---- |
| 1 | `src/cli.rs:43` compress `--output-dir` default が site repo 固有 | default を `./work/compressed` に変更 |
| 2 | Makefile `CDT_INSTALL_HINT` が extract 後に壊れる | Codex #2 と同じ修正で解消 |
| 3 | Ruby 版との byte parity 検証が未実装 | `tests/fixtures/oracle/entries.dict` を Ruby 版で事前生成し commit。`tests/dictionary_parity.rs` に `dictionary_matches_ruby_oracle` を追加、実測で pass 確認 (CI 実行時 ruby 不要) |
| 4 | Phase 2 性能判定プロトコル未定義 | Codex #1 と同じ記述で解消 (bench スクリプト実装は残タスク) |
| 5 | `NOTICE` placeholder / `THIRD_PARTY_LICENSES/` 空 | `NOTICE` に直接依存 7 点 (libbrotli / libzstd / clap / sha2 / base64 / brotlic-sys / zstd-safe) の帰属表示を記述。`THIRD_PARTY_LICENSES/` に `MIT.txt` / `BSD-3-Clause.txt` / `Apache-2.0.txt` の 3 本文と `README.md` の対応表を格納 |
| 6 | `LICENSE` copyright holder 空 | `Copyright (c) 2026 Jxck` |
| 7 | `release.yml` が archive 未作成 | `.tar.gz` 生成、`shasum`/`sha256sum` による checksum 同梱、`gh release upload` step を追加。同梱物は `cdt` binary + `LICENSE` + `NOTICE` + `THIRD_PARTY_LICENSES/` + `README.md` |

#### Claude Review (中位)

| # | 指摘 | 対応 |
| - | ---- | ---- |
| 8 | `src/dictionary/mod.rs:360` 未使用 `_sha256_base64` + 死んだ `base64` 依存 | verbose 時に Ruby 版相当の `sha256: :BASE64:` を stderr に出力。併せて Ruby parity の verbose 4 行 (`reading`, `counted i/N`, `qualified N slices`, `selected N blocks`, 終了時 `wrote ...`) を実装 |
| 9 | `Cargo.toml` 依存重複・未使用 | `zstd` 削除 (`zstd-safe` のみ使用)、`tempfile` を `[dev-dependencies]` のみに統一 |
| 10 | `scripts/check.sh` 内の `ruby -e` 依存 | `$(<file)` と `cmp -s` で置換し Linux runner でも自己完結 |
| 11 | `src/compress/mod.rs:80` `path.display()` lossy | `OsString::push` ベースの `with_suffix` に書き直し |

#### Claude Review (下位)

| # | 指摘 | 対応 |
| - | ---- | ---- |
| 12 | `src/main.rs` の inline `mod ffi` | `src/ffi/mod.rs` に切り出し |
| 13 | `compress::relative_to_cwd_or_out` と `io::relative_path` の責務重複 | `compress.rs` 側を `relative_to_anchor` にリネームし、cwd/out_dir 外 input を `Err` で弾く仕様に変更 (A. の論点) |
| 14 | `HashMap<K, bool>` が `HashSet` 代用 | `cover_block` / document frequency 集計の `seen` を `HashSet<K>` に置換 |
| 15 | `rust-version` 未指定 | `rust-version = "1.85"` を `Cargo.toml` に追加 (edition 2024 floor) |
| 16 | `repository = "https://example.invalid/..."` placeholder | 削除 (extract 前は何も書かない方が安全) |

#### Claude Review (WIP 追加指摘)

| # | 指摘 | 対応 |
| - | ---- | ---- |
| A | `relative_to_cwd_or_out` が cwd/out_dir 外 input を絶対パスに落とす | `Err` で弾く仕様に確定。`tests/compress_parity.rs` は cwd/out_dir 内 input しか使わないので既存テスト影響なし |
| B | root workflow (`mise exec rust@1.95.0`) と subdir workflow (`dtolnay/rust-toolchain@stable`) で toolchain がズレ | 両方 `dtolnay/rust-toolchain@stable` に統一。MSRV は `Cargo.toml` の `rust-version = "1.85"` で担保 |
| C | Cargo.toml の placeholder `repository` (下位 #16 と同じ) | 対応済み |
| D | verbose 出力の仕様確定 | Ruby parity に揃える方向で確定し実装 |
| E | `--output-dir` の compress / dictionary での非対称 (compress のみ create_dir_all) | 現状維持 (compress は出力先ディレクトリ作成が自然、dictionary は `-o` の親のみ作成で十分という判断) |
| F | Phase 2 性能判定プロトコル (Codex #1 と同じ) | 対応済み |
| G | `scripts/check.sh` ruby 依存 | 対応済み |

### 2. 今回確定した実装判断

- `cdt compress --output-dir` default: `./work/compressed` (package 相対、extract 後も意味が通る)
- Install hint の語彙: `see .src/cdt-toolkit/README.md for installation` — README を single source of truth とし、pre/post-extract で文言を切り替えない
- cwd/out_dir 外 input の挙動: `Err` で弾く (黙って絶対パスに書くより失敗させる方が安全)
- Ruby parity test の運用: Ruby 版で生成した `active.dict` 相当を `tests/fixtures/oracle/entries.dict` に commit し、`cargo test` 実行時は ruby 不要。再生成手順は `tests/fixtures/oracle/README.md` に記載
- MSRV: `rust-version = "1.85"` (edition 2024 floor)、workflow は `stable` で動かす
- verbose 出力の仕様: Ruby 版と同じ行構成を stderr に出す (parity は「辞書 bytes」だけでなく開発者目線でも合わせる)
- ffi::zstd の出力バッファ: `zstd-safe` の `WriteBuf` は `Vec<u8>` を実装していないので、`vec![0u8; compress_bound]` を `&mut [u8]` として渡し、返却 len で truncate する形に固定

### 3. 検証結果

Rust 1.95.0 (mise 経由) 上で以下を実施:

- `cargo check --all-targets` — clean
- `cargo clippy --all-targets -- -D warnings` — clean (warning 0)
- `cargo test` — 4/4 pass
  - `cli_help_works`
  - `dictionary_generation_is_deterministic`
  - `dictionary_matches_ruby_oracle` (**Ruby 版とバイト一致、フィクスチャ corpus 上で Phase 2 byte parity ゲートの empirical 確認**)
  - `dictionary_and_compress_emit_outputs`
- `scripts/check.sh` — ok (docfreq / boundary / trim / overlap / deterministic + size-cap)

Ruby parity 合格条件で採用したパラメータ: `-s 8192 -l 12 -b 4096 -f 2`。本番運用値 (`-s 262144 -l 12 -b 4096 -f 3`) は fixture corpus が小さすぎて有効な byte parity 検証にならないため、フィクスチャ向けには縮小値を使用。本番パラメータでの parity は site repo 側 blog 全量 corpus で Phase 2 出口条件として別途担保する。

### 4. 変更ファイル一覧

```
.agents/plan/20260422-0058-rust-cdt-toolkit.md
.github/workflows/cdt-toolkit-ci.yml
.src/cdt-toolkit/.github/workflows/ci.yml
.src/cdt-toolkit/.github/workflows/release.yml
.src/cdt-toolkit/Cargo.lock
.src/cdt-toolkit/Cargo.toml
.src/cdt-toolkit/LICENSE
.src/cdt-toolkit/NOTICE
.src/cdt-toolkit/README.md
.src/cdt-toolkit/THIRD_PARTY_LICENSES/.gitkeep                      # deleted
.src/cdt-toolkit/THIRD_PARTY_LICENSES/Apache-2.0.txt                # new
.src/cdt-toolkit/THIRD_PARTY_LICENSES/BSD-3-Clause.txt              # new
.src/cdt-toolkit/THIRD_PARTY_LICENSES/MIT.txt                       # new
.src/cdt-toolkit/THIRD_PARTY_LICENSES/README.md                     # new
.src/cdt-toolkit/scripts/check.sh
.src/cdt-toolkit/src/cli.rs
.src/cdt-toolkit/src/compress/mod.rs
.src/cdt-toolkit/src/dictionary/mod.rs
.src/cdt-toolkit/src/ffi/mod.rs                                     # new
.src/cdt-toolkit/src/ffi/zstd.rs
.src/cdt-toolkit/src/main.rs
.src/cdt-toolkit/tests/dictionary_parity.rs
.src/cdt-toolkit/tests/fixtures/oracle/entries.dict                 # new (binary)
.src/cdt-toolkit/tests/fixtures/oracle/README.md                    # new
Makefile
```

### 5. 残タスク (次に着手すべき順)

1. **Phase 2 の性能検証**: site repo 側に `.src/dictionary/bench.sh` を作成し、blog 全量 corpus (`blog.jxck.io/entries/**/*.html`) に対して Ruby 版 / Rust 版を本番パラメータ (`-s 262144 -l 12 -b 4096 -f 3`) で回し、warm 5 回の real time 中央値を比較する。合格なら Phase 2 クローズ。
2. **Phase 2 本番 parity 検証**: 同じ bench script 内で Ruby 版と Rust 版の出力 dict を SHA-256 比較する (fixture corpus での parity は取れているが、本番 corpus / 本番パラメータでの parity はまだ未検証)。
3. **Phase 3 early empirical check**: 最小 fixture 1 本で `brotli -q 11 -w 24 --dictionary=D` / `zstd -22 --ultra --long=23 --patch-from=D` と Rust 出力を比較。byte-identical なら Phase 3 合格ラインを byte parity に引き上げる。
4. **Phase 4 site 統合の実機検証**: `cargo install --path .src/cdt-toolkit` して `make dict` / `make comp` / `make clean` が通るか確認。
5. **Phase 5 extract rehearsal**: `.src/cdt-toolkit/` を throwaway repo にコピー → `git init` → push → `v0.0.0-rehearsal.0` tag → `release.yml` 実走 → `.tar.gz` 3 target の生成と `cdt --help` の起動確認 → throwaway 削除。
6. **Phase 6 旧実装削除**: 上記が全部通った後に `.src/dictionary/dict-generator.rb` / `compress.sh` / `hash.rb` / `work/check.sh` を削除。
7. **Phase 7 本番 extract**: `.src/cdt-toolkit/` をコピー → `git init` → 本番 repo push → `v0.1.0` tag → release artifact 生成 → site repo から `.src/cdt-toolkit/` と root workflow を削除 → `cdt` 取り込み経路を新 repo の Releases に差し替え。
