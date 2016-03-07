/*  Gulp modules */
var gulp = require('gulp')
require('gulp-help')(gulp)
var tslint = require('gulp-tslint')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var rimraf = require('gulp-rimraf')
var sourcemaps = require('gulp-sourcemaps')
var ts = require('gulp-typescript')
var nodemon = require('gulp-nodemon')
//var nodeDebug = require('gulp-node-debug')

/*  Variables */
var tsconfig = require('./tsconfig')
var sourceFiles = 'src/**/*.ts'
var testFiles = 'test/**/*.ts'
var entryPoint = './build/src/app.js'
var outDir = tsconfig.compilerOptions.outDir
var tsFiles = [sourceFiles, testFiles]
var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
})

/*  Gulp Tasks */

gulp.task('clean', 'Clean build folder.', () => {
  return gulp.src(outDir, {read: false})
    .pipe(rimraf())
})

gulp.task('build', 'Build all Typescript files.', ['clean'], () => {
  var tsResult = gulp.src(tsFiles, { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(outDir))
})

gulp.task('nodemon', 'Run nodemon (Build and Watch Ts files)', ['build'], () => {
  nodemon({
    script: entryPoint,
    env: { 'NODE_ENV': 'development' },
    tasks: ['build']
  })
})

gulp.task('tslint', 'Lints all TypeScript source files.', function () {
  return gulp.src(tsFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

// gulp.task('debug', 'Debug application.', ['build'], () => {
//   gulp.src([entryPoint])
//     .pipe(nodeDebug({
//       debugPort: 5858,
//       webHost: '0.0.0.0',
//       webPort: 5080
//     }))
// })

gulp.task('test', (cb) => {
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
