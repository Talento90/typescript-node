var gulp = require('gulp')
require('gulp-help')(gulp)
var tslint = require('gulp-tslint')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var rimraf = require('gulp-rimraf')
var sourcemaps = require('gulp-sourcemaps')
var ts = require('gulp-typescript')
var nodemon = require('gulp-nodemon')

var tsconfig = require('./tsconfig')
var sourceFiles = 'src/**/*.ts'
var testFiles = 'test/**/*.ts'
var srcOption = { base: './' }
var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
})
var outDir = tsconfig.compilerOptions.outDir
var tsFiles = [sourceFiles, testFiles]

gulp.task('nodemon', 'Run nodemon (Build and Watch Ts files)', ['watch'], function () {
  nodemon({
    script: './build/src/app.js'
  })
})

gulp.task('clean', 'Clean build folder.', function () {
  return gulp.src(outDir, {read: false})
    .pipe(rimraf())
})

gulp.task('build', 'Build all Typescript files.', ['clean'], function () {
  var tsResult = gulp.src(tsFiles, srcOption)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../..' }))
    .pipe(gulp.dest(outDir))
})

gulp.task('watch', 'Watch all ts files.', ['build'], function () {
  gulp.watch(sourceFiles, ['build'])
})

gulp.task('test', function (cb) {
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

gulp.task('tslint', 'Lints all TypeScript source files.', function () {
  return gulp.src(tsFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})
