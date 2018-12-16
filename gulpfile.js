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

gulp.task('image', (done) => {
  gulp.src('blog.jxck.io/entries/**/*.+(png|jpeg|svg)')
    .pipe(image(imageOption))
    .pipe(gulp.dest('blog.jxck.io/entries/'))
    .on('end', done)
})

gulp.task('default', gulp.series('image'))
