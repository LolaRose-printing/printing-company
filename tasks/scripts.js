const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject-string');

function build() {
  return src('app/**/*.js')
    .pipe(babel())
    .pipe(inject.replace('process.env.NODE_ENV', '"production"'))
    .pipe(dest('build'));
}

function developBuild() {
  return src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(dest('build'));
}

function cssMerge() {
  return src('app/**/*.css')
    .pipe(concat('concat.css'))
    .pipe(dest('build/renderer'));
}

build.displayName = 'build-scripts';
developBuild.displayName = 'dev-build-scripts';
cssMerge.displayName = 'css-build';

exports.build = build;
exports.developBuild = developBuild;
exports.cssMerge = cssMerge;
