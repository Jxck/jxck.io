#!/usr/bin/env zsh

for file in \
  jxck.120x120.png     \
  jxck.300x300.png     \
  jxck.600x600.png     \
  jxck.1200x1200.png   \
  jxck.3000x3000.png   \
  mozaic.120x120.png   \
  mozaic.300x300.png   \
  mozaic.600x600.png   \
  mozaic.1200x1200.png \
  mozaic.3000x3000.png
do
  avifenc --lossless "$file"    "${file:r}.avif"
  cwebp    -lossless "$file" -o "${file:r}.webp"
done
