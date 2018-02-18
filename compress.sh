#!/bin/sh

for i in `seq 1 ${#}`
do
  echo
  echo "rm ${1}"
  selects path from "./${1}/**/*" where extname '=~' 'gz|br' | q | tee -a /dev/stderr | xargs -L 1 -P 4 rm

  echo
  echo "zopfli ${1}"
  selects path from "./${1}/**/*" where path '!~' 'drafts' and extname '=~' '[^.gz|.br|.webp|.rb|.md|.woff2]' | q | tee -a /dev/stderr | xargs -P 4 zopfli --i30

  echo
  echo "brotli ${1}"
  selects path from "./${1}/**/*" where path '!~' 'drafts' and extname '=~' '[^.gz|.br|.webp|.rb|.md|.woff2]' | q | tee -a /dev/stderr | xargs -P 4 -IXXX brotli XXX
  shift
done
