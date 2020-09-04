#!/usr/bin/zsh

NOW=$(date +"%Y%m%d")

\rm -rf ./tmp
\mkdir ./tmp
cd ./tmp
wget https://noto-website-2.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip
unzip NotoSansCJKjp-hinted.zip


REGULAR=(
"NotoSansCJKjp-Regular.otf"
"NotoSansMonoCJKjp-Regular.otf"
)
BOLD=(
"NotoSansCJKjp-Bold.otf"
"NotoSansMonoCJKjp-Bold.otf"
)

FEATURES='palt'

foreach target in $REGULAR
 woff2=`echo $target | sed "s/.otf/-Jxck-$NOW.woff2/g"`
 pyftsubset $target --layout-features=$FEATURES --flavor=woff2 --output-file=$woff2 --text-file=../font-regular.txt
 mv $woff2 ../
end

foreach target in $BOLD
 woff2=`echo $target | sed "s/.otf/-Jxck-$NOW.woff2/g"`
 pyftsubset $target --layout-features=$FEATURES --flavor=woff2 --output-file=$woff2 --text-file=../font-bold.txt
 mv $woff2 ../
end

sed -i -e "s/2020[0-9]\{4\}\.woff2/$NOW.woff2/g" $SERVER/jxck.io/.mruby.handler/*
sed -i -e "s/2020[0-9]\{4\}\.woff2/$NOW.woff2/g" $SERVER/jxck.io/.script/template/*.erb
sed -i -e "s/2020[0-9]\{4\}\.woff2/$NOW.woff2/g" $SERVER/jxck.io/labs.jxck.io/**/*.html
sed -i -e "s/2020[0-9]\{4\}\.woff2/$NOW.woff2/g" $SERVER/jxck.io/www.jxck.io/assets/js/*.js
sed -i -e "s/2020[0-9]\{4\}\.woff2/$NOW.woff2/g" $SERVER/jxck.io/www.jxck.io/assets/css/*.css

cd ../
\rm -rf ./tmp
