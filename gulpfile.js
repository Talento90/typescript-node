'use strict';

let gulp = require('gulp');
let rimraf = require('gulp-rimraf');
let tslint = require('gulp-tslint');
let mocha = require('gulp-mocha');
let path = require('path');
let exec = require('child_process').exec;

const tscCmd = "npm run tsc";

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
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript.
 */

function compileTS(args, cb) {  
  return exec(tscCmd + args, (err, stdout, stderr) => {
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
}

gulp.task('compile', (cb) => {
    compileTS('', cb);
});

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', (cb) => {
    compileTS(' -w', cb);
});

/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
    return gulp.src("src/configurations/*.json")
      .pipe(gulp.dest('./build/src/configurations'));     
});

/**
 * Build the project.
 */
gulp.task('build', ['tslint', 'compile', 'configs'], () => {
  console.log('Building the project ...');
});

/**
 * Run tests.
 */
gulp.task('test', ['compile'], (cb) => {
      gulp.src(['build/test/**/*.js'])
        .pipe(mocha())
        .once('error', (error) => {
          console.log(error);
          process.exit(1);
        })
        .once('end', () => {
          process.exit();
        });
});

gulp.task('default', ['build']);