'use strict';

let gulp = require('gulp');
let image = require('gulp-image');

const imageOption = {
  pngquant:       true,
  optipng:        true,
  zopflipng:      true,
  advpng:         true,
  jpegRecompress: true,
  jpegoptim:      true,
  mozjpeg:        true,
  gifsicle:       true,
  svgo:           true,
}

gulp.task('image', () => {
  gulp.src('labs.jxck.io/image/orig/*')
    .pipe(image(imageOption))
    .pipe(gulp.dest('labs.jxck.io/image/dest'));
});

gulp.task('default', ['image']);
