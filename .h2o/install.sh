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
cmake \
  -DCMAKE_INSTALL_PREFIX=$BASE/local \
  -DWITH_MRUBY=on .
make -j$(nproc)
make install
