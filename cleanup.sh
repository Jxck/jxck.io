#!/bin/sh

for i in `seq 1 ${#}`
do
  echo
  echo "rm ${1}"
  selects path from "./${1}/**/*" where extname '=~' 'gz|br' | q | tee -a /dev/stderr | xargs -L 1 -P 4 rm
  shift
done
