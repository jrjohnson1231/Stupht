var gulp = require('gulp');
var browserSync = require('browser-sync');
var bsConfig = require('./bs-config.json')
var del = require('del');
var exec = require('child_process').exec;
var merge = require('merge2')
var plumber = require('gulp-plumber');
var proxyMiddleware = require('http-proxy-middleware');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var tslint = require('gulp-tslint');
var util = require('util');
var watch = require('gulp-watch')

// Clean the contents of the distribution directory
gulp.task('clean', function () {
  del(['dist/**/*']);
});

// TypeScript compile
var tsProject = ts.createProject(tscConfig.compilerOptions);

gulp.task('compile', ['lint'], function () {
  var tsResult = gulp.src(['src/**/*.ts', 'typings/**/*.d.ts'], { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('dist'))
});

// Copy all assets that are not Typescript files
gulp.task("copy:assets", function () {
  return gulp.src(["src/**/*", "!**/*.ts"])
    .pipe(gulp.dest("dist"));
});

// Copy all required libraries
gulp.task("copy:libs", function () {
  return gulp.src([
    'core-js/client/shim.min.js*',
    'systemjs/dist/system-polyfills.js*',
    'systemjs/dist/system.src.js*',
    'reflect-metadata/Reflect.js*',
    'rxjs/**',
    'zone.js/dist/**',
    '@angular/**',
    'ng2-bootstrap/**',
    'moment/**',
    'angular2-jwt/**'
    ], { cwd: "node_modules/**" })
    .pipe(gulp.dest("dist/lib"));
});

gulp.task('lint', function() {
  return gulp.src("src/app/**/*.ts")
  .pipe(tslint({
    formatter: "verbose"
  }))
  .pipe(tslint.report())
  done();
});

// Start a local server in base directory
gulp.task('serve', function() {
  // Add proxy as server middleware

  browserSync.init(bsConfig);
  // Watches for changes in css files, grabs the files, pipes them to browsersync stream
  // This injects the css into the page without a reload
  gulp.watch('dist/app/**/*.css', ['compile']);

});

// Launch Rails server with IPv4
gulp.task('rails', function() {
  exec("rails s -b 127.0.0.1");
});

gulp.task('watch:ts', ['compile'], function() {
  gulp.watch(['typings/index.d.ts', 'src/**/*.ts'], ['compile']);
});

gulp.task("watch:assets", function () {
  return gulp.src(["src/**/*", "!**/*.ts"])
    .pipe(watch(["src/**/*", "!**/*.ts"]))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch:libs", function () {
  return gulp.src([
      'core-js/client/shim.min.js*',
      'systemjs/dist/system-polyfills.js*',
      'systemjs/dist/system.src.js*',
      'reflect-metadata/Reflect.js*',
      'rxjs/**',
      'zone.js/dist/**',
      '@angular/**',
      'ng2-bootstrap/**',
      'moment/**',
      'angular2-jwt/**'
      ], { cwd: "node_modules/**" })
    .pipe(watch([
      'core-js/client/shim.min.js*',
      'systemjs/dist/system-polyfills.js*',
      'systemjs/dist/system.src.js*',
      'reflect-metadata/Reflect.js*',
      'rxjs/**',
      'zone.js/dist/**',
      '@angular/**',
      'ng2-bootstrap/**',
      'moment/**',
      'angular2-jwt/**'
      ], { cwd: "node_modules/**" }))
    .pipe(gulp.dest("dist/lib"));
});

// Launch Rails and Angular apps together
gulp.task('serve:full-stack', ['rails', 'serve']);

gulp.task('jasmine', function() {
  
});

gulp.task('build', ['copy:libs', 'copy:assets', 'compile']);
gulp.task('test', ['compile', 'watch', 'jasmine'])
gulp.task('watch', ['watch:ts', 'watch:assets', 'watch:libs'])
gulp.task('default', ['build', 'serve']);