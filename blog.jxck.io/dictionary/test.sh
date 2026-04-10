# 辞書作成
ruby ./dict-generator.rb \
  -o ./entries.dict \
  -s 262144 \
  -l 12 \
  -b 4096 \
  -f 3 \
  -v \
  ../../.src/template/*.ejs \
  ../entries/**/*.html

# 圧縮
./compress.sh \
  --dict ./entries.dict \
  --output-dir ../entries/2016-01-27/ \
  -dcb \
  ../entries/2016-01-27/new-blog-start.html