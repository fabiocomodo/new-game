// Modules :)
// ===========================================
var gulp    = require('gulp'),
    jade    = require('gulp-jade'),
    data    = require('gulp-data'),
    cssnext = require("gulp-cssnext"),
    connect = require('gulp-connect');

// Compile Jade
// ===========================================
gulp.task('jade', function(){
	gulp.src('src/**.jade')
		.pipe(data(function(file) {
      		return require('./config.json');
    	}))
    	.pipe(jade())
    	.pipe(gulp.dest('out'))
    	.pipe(connect.reload());
});

// cssnext features
// ===========================================
gulp.task("cssnext", function() {
  gulp.src("src/assets/styles/style.css")
    .pipe(cssnext({
        compress: false
    }))
    .pipe(gulp.dest("out/assets/styles/"))
    .pipe(connect.reload());
});

// Watch
// ===========================================
gulp.task('watch', function () {
	gulp.watch(['src/**/**.jade'], ['jade']);
	gulp.watch(['src/assets/styles/**/**.css'], ['cssnext']);
});

// Static server
// ===========================================
gulp.task('connect', function() {
	connect.server({
		root: 'out',
		livereload: true
	});
});

// More Tasks
// ===========================================
gulp.task('serve', ['connect', 'watch']);
