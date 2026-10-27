#!/usr/bin/env zsh

set -eu

BASE=$(cd $(dirname $0) && pwd)

sudo apt update
sudo apt install -y mruby bison cmake make gcc g++

rm -rf $BASE/pkg/h2o
mkdir -p $BASE/pkg

cd $BASE/pkg
git clone --depth=1 https://github.com/h2o/h2o

cd $BASE/pkg/h2o
# OpenSSL は system (3.0.13、ML-KEM 無し) ではなく linuxbrew (3.5+) にリンクする。
# TCP 側 TLS の X25519MLKEM768 (ポスト量子鍵交換) は libcrypto 3.5+ が必要
# (mozaic.fm plan 20260825-1543。3.0.13 リンクでは server が MLKEM を選んだ瞬間に
# alert 80 で落ちる障害を実測)。INSTALL_RPATH が無いと install 後の binary が
# linuxbrew の libssl を見つけられず起動しない。
OPENSSL_DIR=/home/linuxbrew/.linuxbrew/opt/openssl@3

# openssl@4 (4.0.3) には上げられない。OpenSSL 4.0 で ENGINE API が削除され、
# h2o が常時リンクする deps/neverbleed が ENGINE_new / ENGINE_set_RSA 等を
# 無条件に使うため、リンク時に undefined reference で落ちる
# (h2o 8c137fa で実測。neverbleed は CMake の toggle が無く、実運用でも稼働中)。
# 上流が ENGINE を捨てるまで openssl@3 を維持する。

# h2o の CMakeLists は FIND_PACKAGE(ZLIB) 経由で brew prefix の include を
# OpenSSL より前の -I に積む。そこは openssl@4 への symlink なので、
# 放置するとヘッダだけ 4.x を拾って openssl@3 にリンクし、
# picotls の OPENSSL_sk_set_thunks が undefined reference になる。
# OpenSSL の include を -I の先頭に固定して回避する。
CMAKE_HOOK=$(mktemp -d)/openssl-include-first.cmake
cat > $CMAKE_HOOK <<EOF
INCLUDE_DIRECTORIES(BEFORE $OPENSSL_DIR/include)
EOF

# liburing / libuv / libwslay は入れない。standalone (evloop) の h2o には効かない。
#   libwslay : lib/websocket.c が libh2o に入るだけ。src/ は参照しておらず、
#              WebSocket は proxy.tunnel 側で扱うので wslay 非依存。
#   libuv    : 未使用の libh2o (libuv 版) ターゲットが増えるだけ。
#   liburing : 見えると WITH_IO_URING が既定で on になるが、include/h2o.h の
#              H2O_FILE_FLAG_IO_URING が 0x16 で DIR_LISTING (0x2) と
#              SEND_COMPRESSED (0x4) に bit 衝突している。h2o.conf の
#              file.send-compressed: ON だけで非同期 splice パスが有効になり、
#              file.io_uring: OFF と書くと逆に send-compressed が落ちる。
# linuxbrew の pkg-config は既定の探索パスに system を含まないため、apt で
# 入れても .pc は見えない。将来有効化するなら PKG_CONFIG_PATH に
# /usr/lib/x86_64-linux-gnu/pkgconfig を足す (io_uring は上流修正まで off のまま)。
cmake \
  -DCMAKE_INSTALL_PREFIX=$BASE/local \
  -DOPENSSL_ROOT_DIR=$OPENSSL_DIR \
  -DCMAKE_INSTALL_RPATH=$OPENSSL_DIR/lib \
  -DCMAKE_BUILD_WITH_INSTALL_RPATH=on \
  -DCMAKE_PROJECT_INCLUDE_BEFORE=$CMAKE_HOOK \
  -DWITH_IO_URING=off \
  -DWITH_MRUBY=on .
make -j$(nproc)

# local を消すのはビルド成功後。ビルド前に消すと、失敗した時点で
# 稼働中の h2o の binary が消えたまま残り、reload/restart で復帰できなくなる。
rm -rf $BASE/local
mkdir -p $BASE/local
make install

# Clean up build artifacts
rm -rf $BASE/pkg
