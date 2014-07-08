var gulp = require('gulp');
var runSequence = require('run-sequence');

var concat = require('gulp-concat');
var config = require('./bower.json');
var bower = require('gulp-bower');
var source = 'lib/PathFinderPlugin.js';
var uglify = require('gulp-uglify');

gulp.task('default', function(){
  gulp.run('build');
});

gulp.task('build', function() {
  runSequence('bower', 'concat', 'minify');
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('concat', function() {
  var easyStarVersion = require('./bower_components/easystarjs/package.json').version;
  var sources = ['bower_components/easystarjs/bin/easystar-'+easyStarVersion+'.js', source];
  gulp.src(sources)
      .pipe(concat('phaser_pathfinding-' + config.version + '.js'))
      .pipe(gulp.dest('bin'));
});

gulp.task('minify', function() {
  gulp.src([source])
      .pipe(concat('phaser_pathfinding-' + config.version + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('bin'));
});
