#!/bin/sh

set -e

if ! command -v gen-bundle > /dev/null 2>&1; then
    echo "gen-bundle is not installed. Please run:"
    echo "  go get -u github.com/WICG/webpackage/go/bundle/cmd/..."
    exit 1
fi

gen-bundle \
  -version b1 \
  -baseURL https://localhost.jxck.io:3000/ \
  -primaryURL https://localhost.jxck.io:3000/root.js \
  -dir subresource/ \
  -o subresource.wbn
