#!/usr/bin/env zsh

set -eu

BASE=$(cd $(dirname $0) && pwd)

sudo apt update
sudo apt install -y mruby bison cmake make gcc g++ \
  liburing-dev libuv1-dev libwslay-dev

rm -rf $BASE/pkg/h2o
rm -rf $BASE/local
mkdir -p $BASE/pkg
mkdir -p $BASE/local

cd $BASE/pkg
git clone --depth=1 https://github.com/h2o/h2o

cd $BASE/pkg/h2o
# OpenSSL は system (3.0.13、ML-KEM 無し) ではなく linuxbrew (3.5+) にリンクする。
# TCP 側 TLS の X25519MLKEM768 (ポスト量子鍵交換) は libcrypto 3.5+ が必要
# (mozaic.fm plan 20260825-1543。3.0.13 リンクでは server が MLKEM を選んだ瞬間に
# alert 80 で落ちる障害を実測)。INSTALL_RPATH が無いと install 後の binary が
# linuxbrew の libssl を見つけられず起動しない。
OPENSSL_DIR=/home/linuxbrew/.linuxbrew/opt/openssl@3
cmake \
  -DCMAKE_INSTALL_PREFIX=$BASE/local \
  -DOPENSSL_ROOT_DIR=$OPENSSL_DIR \
  -DCMAKE_INSTALL_RPATH=$OPENSSL_DIR/lib \
  -DCMAKE_BUILD_WITH_INSTALL_RPATH=on \
  -DWITH_MRUBY=on .
make -j$(nproc)
make install

# Clean up build artifacts
rm -rf $BASE/pkg