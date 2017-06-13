var gulp = require('gulp');
var sync = require('run-sequence');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var browser = require('browser-sync');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var argv = require('yargs').argv;

var paths = {
    app: 'app/**/*.{js,scss,jade}',
    sass: 'app/scss/main.scss',
    js: 'app/js/*.js',
    jade: 'app/views/index.jade',
    toCopy: 'bower_components/**/*',
    dest: 'docs/'
};

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulpif(argv.production, cleanCSS()))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('jade', function () {
    return gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(amdOptimize('main'))
        .pipe(concat('main.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(paths.dest));

});

gulp.task('copy', function () {
    return gulp.src(paths.toCopy)
        .pipe(gulp.dest(paths.dest));
});

gulp.task('serve', function () {
    browser({
        port: process.env.PORT || 3000,
        open: false,
        ghostMode: false,
        server: {
            baseDir: 'docs'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.app, ['sass', 'jade', 'js', browser.reload]);
});

gulp.task('default', function (done) {
    sync('sass', 'jade', 'js', 'copy', 'serve', 'watch', done);
});