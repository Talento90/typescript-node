var gulp    = require('gulp');
var tslint  = require('gulp-tslint');
var mocha = require('gulp-mocha');
var gulp    = require('gulp-help')(gulp);
var ts = require('gulp-typescript');


var tsconfig = require('./tsconfig');
var tsFiles = ['src/**/*.ts', 'test/**/*.ts'];
var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('build', function () {
 var outDir = tsconfig.compilerOptions.outDir;
 
 var tsResult = gulp.src(tsFiles)
        .pipe(ts(tsProject));
        return tsResult.js.pipe(gulp.dest(outDir));
});

gulp.task('test', 'Runs the Mocha tests', ['build'], function () {
    return gulp.src('build/test/**/*.js')
        .pipe(mocha({reporter: 'xunit'}));
});

gulp.task('tslint', 'Lints all TypeScript source files', function(){
  return gulp.src(tsFiles)
  .pipe(tslint())
  .pipe(tslint.report('verbose'));
});
