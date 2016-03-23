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
  gulp.src('blog.jxck.io/entries/**/*')
    .pipe(image(imageOption))
    .pipe(gulp.dest('blog.jxck.io/entries/'));
});

gulp.task('default', ['image']);
