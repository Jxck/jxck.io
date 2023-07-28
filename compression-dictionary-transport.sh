#!/usr/bin/env zsh

cd $DEV/jxck.io/blog.jxck.io/dictionary

\rm -rf ./*

cat ../../.src/template/blog.html.ejs \
    ../../.src/template/favicon.html.ejs \
    ../../.src/template/meta.html.ejs \
    ../../.src/template/json-ld.html.ejs \
    ../../.src/template/blog.footer.html.ejs > sample.ejs

dictionary_generator ./shared.dict ./sample.ejs

hash=`sha256sum ./shared.dict | cut -f1 -d' '`

cp shared.dict ${hash}.dict

brotli \
  ../entries/2016-01-27/new-blog-start.html \
   -D ${hash}.dict \
   -o ../entries/2016-01-27/new-blog-start.html.sb \
   -f