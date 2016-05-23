var gulp = require('gulp');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var yargs = require('yargs').argv;

var paths = {
	scripts: ['assets/js/**/*.js'],
	sass: ['assets/sass/**/*.scss'],
}

gulp.task('lint', function() {
	return gulp.src(paths.scripts)
	.pipe(jshint())
	.on('error', function(){});
})

gulp.task('js', function() {
	return browserify('assets/js/app.js', {
		insertGlobals: true,
		debug: !yargs.production,
	})
	.bundle()
	.on('error', function(){})
	.pipe(source('app.js'))
	.pipe(gulpIf(yargs.production, buffer()))
	.pipe(gulpIf(yargs.production, uglify()))
	.pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function() {
	return sass(paths.sass, {
		sourcemap: !yargs.production,
		loadPath: ['./', 'node_modules'],
		style: yargs.production ? 'compressed' : 'expanded',
	})
	.on('error', function(){})
	.pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['lint', 'js']);
	gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['lint', 'js', 'sass']);
