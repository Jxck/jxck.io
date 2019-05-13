'use strict';

const gulp  = require('gulp');
const image = require('gulp-image');

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
gulp.task('image', (done) => {
  const path = process.argv[4]
  const dir  = require('path').parse(path).dir
  gulp.src(path)
    .pipe(image(imageOption))
    .pipe(gulp.dest(dir))
    .on('end', done)
})

gulp.task('default', gulp.series('image'))
