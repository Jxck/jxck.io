mv NotoSansCJKjp-Bold-Jxck-201908.otf             NotoSansCJKjp-Bold-Jxck-201909.otf
mv NotoSansCJKjp-Bold-Jxck-201908.woff            NotoSansCJKjp-Bold-Jxck-201909.woff
mv NotoSansCJKjp-Bold-Jxck-201908.woff2           NotoSansCJKjp-Bold-Jxck-201909.woff2
mv NotoSansCJKjp-Regular-Jxck-201908.otf          NotoSansCJKjp-Regular-Jxck-201909.otf
mv NotoSansCJKjp-Regular-Jxck-201908.woff         NotoSansCJKjp-Regular-Jxck-201909.woff
mv NotoSansCJKjp-Regular-Jxck-201908.woff2        NotoSansCJKjp-Regular-Jxck-201909.woff2
mv NotoSansMonoCJKjp-Bold-Jxck-201908.otf         NotoSansMonoCJKjp-Bold-Jxck-201909.otf
mv NotoSansMonoCJKjp-Bold-Jxck-201908.woff        NotoSansMonoCJKjp-Bold-Jxck-201909.woff
mv NotoSansMonoCJKjp-Bold-Jxck-201908.woff2       NotoSansMonoCJKjp-Bold-Jxck-201909.woff2
mv NotoSansMonoCJKjp-Regular-Jxck-201908.otf      NotoSansMonoCJKjp-Regular-Jxck-201909.otf
mv NotoSansMonoCJKjp-Regular-Jxck-201908.woff     NotoSansMonoCJKjp-Regular-Jxck-201909.woff
mv NotoSansMonoCJKjp-Regular-Jxck-201908.woff2    NotoSansMonoCJKjp-Regular-Jxck-201909.woff2

sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/.mruby.handler/*
sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/.template/*
sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/labs.jxck.io/**/*.html
sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/www.jxck.io/assets/js/*.js
sed -i -e "s/201908.woff2/201909.woff2/g" ~/server/jxck.io/www.jxck.io/assets/css/*.css

cd ~/server/jxck.io
make full
