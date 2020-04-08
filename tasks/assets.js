const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/renderer/index.html').pipe(dest('build/renderer'));
}

function copyJsons() {
  return src('app/renderer/data/*.json').pipe(dest('build/renderer/data/'));
}

copyHtml.displayName = 'copy-html';
copyJsons.displayName = 'copy-jsons';

exports.copyHtml = copyHtml;
exports.copyJsons = copyJsons;
