#!/usr/bin/zsh

\rm -rf ./tmp
\mkdir ./tmp
cd ./tmp
wget https://noto-website-2.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip
unzip NotoSansCJKjp-hinted.zip


NOW=$(date +"%Y%m%d")

TARGETS=(
"NotoSansCJKjp-Bold.otf"
"NotoSansCJKjp-Regular.otf"
"NotoSansMonoCJKjp-Bold.otf"
"NotoSansMonoCJKjp-Regular.otf"
)

foreach target in $TARGETS
 woff=`echo $target | sed "s/.otf/-Jxck-$NOW.woff/g"`
 woff2=`echo $target | sed "s/.otf/-Jxck-$NOW.woff2/g"`
 pyftsubset $target --text-file=../All.txt --layout-features='*' --flavor=woff  --output-file=$woff
 pyftsubset $target --text-file=../All.txt --layout-features='*' --flavor=woff2 --output-file=$woff2
end

#mv NotoSansCJKjp-Bold-Jxck-201908.otf             NotoSansCJKjp-Bold-Jxck-201909.otf
#mv NotoSansCJKjp-Bold-Jxck-201908.woff            NotoSansCJKjp-Bold-Jxck-201909.woff
#mv NotoSansCJKjp-Bold-Jxck-201908.woff2           NotoSansCJKjp-Bold-Jxck-201909.woff2
#mv NotoSansCJKjp-Regular-Jxck-201908.otf          NotoSansCJKjp-Regular-Jxck-201909.otf
#mv NotoSansCJKjp-Regular-Jxck-201908.woff         NotoSansCJKjp-Regular-Jxck-201909.woff
#mv NotoSansCJKjp-Regular-Jxck-201908.woff2        NotoSansCJKjp-Regular-Jxck-201909.woff2
#mv NotoSansMonoCJKjp-Bold-Jxck-201908.otf         NotoSansMonoCJKjp-Bold-Jxck-201909.otf
#mv NotoSansMonoCJKjp-Bold-Jxck-201908.woff        NotoSansMonoCJKjp-Bold-Jxck-201909.woff
#mv NotoSansMonoCJKjp-Bold-Jxck-201908.woff2       NotoSansMonoCJKjp-Bold-Jxck-201909.woff2
#mv NotoSansMonoCJKjp-Regular-Jxck-201908.otf      NotoSansMonoCJKjp-Regular-Jxck-201909.otf
#mv NotoSansMonoCJKjp-Regular-Jxck-201908.woff     NotoSansMonoCJKjp-Regular-Jxck-201909.woff
#mv NotoSansMonoCJKjp-Regular-Jxck-201908.woff2    NotoSansMonoCJKjp-Regular-Jxck-201909.woff2
#
#sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/.mruby.handler/*
#sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/.template/*
#sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/labs.jxck.io/**/*.html
#sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/www.jxck.io/assets/js/*.js
#sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/www.jxck.io/assets/css/*.css
#
#cd ~/server/jxck.io
#make full
