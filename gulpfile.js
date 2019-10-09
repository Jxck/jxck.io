'use strict';

const path  = require('path')
const gulpImage = require('gulp-image');
const {src, dest, series} = require('gulp');

const imageOption = {
  pngquant:       true,
  optipng:        true,
  zopflipng:      false,
  jpegRecompress: true,
  jpegoptim:      true,
  mozjpeg:        true,
  gifsicle:       true,
  svgo:           true,
  concurrent:     4,
}

// gulp image --path ./path/to/image.png
function image(done) {
  const target = process.argv[4]
  console.log(target)
  const dir = path.parse(target).dir
  return src(target)
    .pipe(gulpImage(imageOption))
    .pipe(dest(dir))
}

exports.image = image
exports.default = series(image)
