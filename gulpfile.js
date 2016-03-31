'use strict';

let gulp = require('gulp');
let rimraf = require('gulp-rimraf');
let tslint = require('gulp-tslint');
let mocha = require('gulp-mocha');
let path = require('path');
let exec = require('child_process').exec;

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src(sourceFiles)
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */

gulp.task('compile', (cb) => {
  exec('tsc --version', (err, stdout, stderr) => {
    console.log('TypeScript ', stdout);
    if (stderr) {
      console.log(stderr);
    }
  });

  return exec('tsc', (err, stdout, stderr) => {
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', (cb) => {
  exec('tsc --version', (err, stdout, stderr) => {
    console.log('TypeScript ', stdout);
    if (stderr) {
      console.log(stderr);
    }
  });

  return exec('tsc -w', (err, stdout, stderr) => {
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

/**
 * Build the project.
 */
gulp.task('build', ['tslint', 'compile'], () => {
  console.log('Building the project ...');
});

/**
 * Run tests.
 */
gulp.task('test', ['compile'], (cb) => {
      gulp.src(['build/test/**/*.js'])
        .pipe(mocha())
        .once('error', () => {
          process.exit(1);
        })
        .once('end', () => {
          process.exit();
        });
});

gulp.task('default', ['watch']);