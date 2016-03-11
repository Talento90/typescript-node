// /*  Gulp modules */
// var gulp = require('gulp')
// require('gulp-help')(gulp)
// var tslint = require('gulp-tslint')
// var mocha = require('gulp-mocha')
// var istanbul = require('gulp-istanbul')
// var rimraf = require('gulp-rimraf')
// //var sourcemaps = require('gulp-sourcemaps')
// var ts = require('gulp-typescript')
// var nodemon = require('gulp-nodemon')
// // var nodeDebug = require('gulp-node-debug')

// /*  Variables */
// var tsconfig = require('./tsconfig')
// var sourceFiles = 'src/**/*.ts'
// var testFiles = 'test/**/*.ts'
// var entryPoint = './build/src/server.js'
// var outDir = tsconfig.compilerOptions.outDir
// var tsFiles = [sourceFiles, testFiles]
// var tsProject = ts.createProject('tsconfig.json', {
  // typescript: require('typescript')
// })

// /*  Gulp Tasks */

// gulp.task('clean', 'Clean build folder.', () => {
  // return gulp.src(outDir, {read: false})
    // .pipe(rimraf())
// })

// gulp.task('build', 'Build all Typescript files.', ['clean'], () => {
  // var tsResult = gulp.src(tsFiles, { base: 'src' })
// //    .pipe(sourcemaps.init())
    // .pipe(ts(tsProject))

  // return tsResult.js
// //    .pipe(sourcemaps.write({ includeContent: true }))
    // .pipe(gulp.dest(outDir))
// })

// gulp.task('nodemon', 'Run nodemon (Build and Watch Ts files)', ['build'], () => {
  // nodemon({
    // script: entryPoint,
    // env: { 'NODE_ENV': 'development' },
    // tasks: ['build']
  // })
// })

// gulp.task('tslint', 'Lints all TypeScript source files.', function () {
  // return gulp.src(tsFiles)
    // .pipe(tslint())
    // .pipe(tslint.report('verbose'))
// })

// // gulp.task('debug', 'Debug application.', ['build'], () => {
// //   gulp.src([entryPoint])
// //     .pipe(nodeDebug({
// //       debugPort: 5858,
// //       webHost: '0.0.0.0',
// //       webPort: 5080
// //     }))
// // })

// gulp.task('test', (cb) => {
  // gulp.src(['build/src/**/*.js'])
    // .pipe(istanbul())
    // .pipe(istanbul.hookRequire())
    // .on('finish', function () {
      // gulp.src(['build/test/**/*.js'])
        // .pipe(mocha())
        // .pipe(istanbul.writeReports(
          // {
            // dir: './reports/test-coverage',
            // reporters: ['html']
          // }
        // ))
        // .on('end', cb)
    // })
// })

"use strict";

let gulp = require("gulp");
let rimraf = require('gulp-rimraf')
let tsc = require("gulp-typescript");
let sourcemaps = require('gulp-sourcemaps');
let tsProject = tsc.createProject("tsconfig.json");
let tslint = require('gulp-tslint');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return rimraf(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", [], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile'], () => {
    console.log("Building the project ...");
});