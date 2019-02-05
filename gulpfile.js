const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');

gulp.task('serve', () => {
  bs.init({
    server: './dest',
    open: false,
    port: 3030,
    ui: {
      port: 3031,
    },
  });

  gulp.watch('src/**/*.scss', gulp.parallel('build-sass'));
});

gulp.task('build-sass', () => {
  return gulp.src(['src/**/*.scss', '!src/**/_*.scss'])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('dest'));
});

gulp.task('default', gulp.parallel('serve'));
