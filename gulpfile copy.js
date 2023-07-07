/**
 * GULP Workflow for themes.
 *
 * This file adds Gulp tasks to the theme.
 *
 * @author Closemarketing
 */

// Require our dependencies.
const browserSync = require('browser-sync').create();
const cleancss = require('gulp-clean-css');
const gulp = require('gulp');
const pixrem = require('gulp-pixrem');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// Project specific variables - CHANGE THESE
const siteName = 'url'; // set your siteName here

/**
 * Error handling
 *
 * @function
 */
function handleErrors() {
  const args = Array.prototype.slice.call(arguments);

  notify
    .onError({
      title: 'Task Failed [<%= error.message %>]',
      message:
        '<%= error %> - See console or enable logging in the plugin.'
    })
    .apply(this, args);

  // Prevent the 'watch' task from stopping
  this.emit('end');
}

/*******************
 * JavaScript Tasks
 *******************/

/**
 * JavaScript Task Handler.
 */
gulp.task('js', () => {
  gulp
    .src(['!./js/*.min.js', './js/*.js'])

    // Error handling.
    .pipe(
      plumber({
        errorHandler: handleErrors
      })
    )

    // Minify JavaScript.
    .pipe(
      minify({
        ext: {
          src: '.js',
          min: '.min.js'
        },
        noSource: true
      })
    )
    .pipe(gulp.dest('js'))

    // Inject changes via browserSync.
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
});

/**********************
 * All Tasks Listeners
 *********************/

/**
 * Reload browser for PHP & JS file changes and inject CSS changes.
 *
 * https://browsersync.io/docs/gulp
 */
gulp.task('watch', () => {
  browserSync.init({
    proxy: `http://siteName`,
    host: siteName,
    open: 'external',
    port: 8000
  });

  // Watch JavaScript Files. The task tries to inject changes into the browser. If that's not possible, it reloads the browser.
  gulp.watch(['./js/*.js', '!./js/*.min.js'], ['scripts']);

  // Get changes in style
  gulp
  .watch([
    './style.css'
  ])
  .on('change', browserSync.reload);

  // Watch PHP files and reload the browser if there is a change. Add directories if needed.
  gulp
    .watch([
      './*.php',
      './lib/*.php',
      './lib/**/*.php',
      './widgets/*.php'
    ])
    .on('change', browserSync.reload);
});

/********************
 * Individual tasks.
 *******************/
gulp.task('scripts', ['js']);

gulp.task('images', () =>
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images/dist'))
);

gulp.task('default', ['watch'], () => {
  gulp.start('scripts');
});
