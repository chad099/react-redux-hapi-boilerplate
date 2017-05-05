var
  gulp  = require('gulp'),
  watch = require('./styles/css/semantic/tasks/watch'),
  build = require('./styles/css/semantic/tasks/build')
;
// import task with a custom task name
gulp.task('watch-semantic-ui', watch);
gulp.task('build-semantic-ui', build);
