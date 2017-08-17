#!/bin/sh

for i in `seq 1 ${#}`
do
  echo
  echo "rm ${1}"
  selects path from "./${1}/**/*" where extname '=~' 'gz|br' | q | tee -a /dev/stderr | xargs -L 1 -P 4 rm

  echo
  echo "zopfli ${1}"
  selects path from "./${1}/**/*" where path '!~' 'drafts' and extname '=~' '[^.gz|.br|.webp|.rb]' | q | xargs -P 4 zopfli --i30

  echo
  echo "brotli ${1}"
  selects path from "./${1}/**/*" where path '!~' 'drafts' and extname '=~' '[^.gz|.br|.webp|.rb]' | q | xargs -P 4 -IXXX bro --quality 10 --input XXX --output XXX.br
  shift
done
