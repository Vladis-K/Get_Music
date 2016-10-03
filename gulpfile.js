var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var wiredep = require('wiredep').stream;

//server
gulp.task('server', function() {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
});

//bower
gulp.task('bower', function () {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory:'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

//styles
gulp.task('styles', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'));
});

//Images
gulp.task('images', function(){
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('build/img'));
});

//Build
gulp.task('build', ['images'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.sass', ['styles']);
    gulp.watch('bower.json', ['bower']);
});

//default
gulp.task('default', ['server','watch']);
