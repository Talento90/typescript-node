'use strict'

let gulp = require('gulp')
let rimraf = require('gulp-rimraf')
let tsc = require('gulp-typescript')
let sourcemaps = require('gulp-sourcemaps')
let tslint = require('gulp-tslint')
let nodemon = require('gulp-nodemon')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')

// /*  Variables */
let tsProject = tsc.createProject('tsconfig.json')
let sourceFiles = 'src/**/*.ts'
let testFiles = 'test/**/*.ts'
let outDir = require('./tsconfig.json').compilerOptions.outDir
let entryPoint = './build/src/server.js'

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf())
})


/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src(sourceFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task('compile', ['clean'], () => {
  let tsResult = gulp.src([sourceFiles, testFiles])
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outDir))
})

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch([sourceFiles], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.')
  })
})

/**
 * Build the project.
 */
gulp.task('build', ['compile'], () => {
  console.log('Building the project ...')
})

gulp.task('test', ['build'], (cb) => {
  gulp.src(['build/src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['build/test/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports(
          {
            dir: './reports/test-coverage',
            reporters: ['html']
          }
        ))
        .on('end', cb)
    })
})

gulp.task('nodemon', ['build'], () => {
  nodemon({
    script: entryPoint,
    env: { 'NODE_ENV': 'development' },
    tasks: ['build']
  })
})
