const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('serve', () => {
  bs.init({
    server: './dest',
    open: false,
  });

  gulp.watch('src/**/*.scss', gulp.parallel('build-sass'));
});

gulp.task('build-sass', () => {
  return gulp.src(['src/**/*.scss', '!src/**/_*.scss'])
    .pipe(sass({ compress: false }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('dest'))
    .pipe(bs.stream());
});

gulp.task('default', gulp.parallel('serve'));
