/**
 * Created by body7 on 16/5/29.
 */

var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var gutil = require('gulp-util');
var bower = require('bower');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sh = require('shelljs');
var stripDebug = require('gulp-strip-debug');

gulp.task('default',['js','services'],function(){
    gulp.src(['./app/app.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./app/min'))
});

gulp.task('js',function(){
    gulp.src(['./app/controllers/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('controllers.min.js'))
        .pipe(gulp.dest('./app/min'))
});

gulp.task('services',function(){
    gulp.src(['./app/services/data.service.js',
        './app/services/authentication.service.js',
        './app/services/flash.service.js',
        './app/services/geocoder.service.js',
        './app/services/utils.service.js',
        './app/services/user.service.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('services.min.js'))
        .pipe(gulp.dest('./app/min'))
});

//, './app/controllers/**/*.js'


