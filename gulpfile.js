/**
 * Copyright 2006-2015 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var gulp = require('gulp'),
    util = require('gulp-util'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    path = require('path'),
    _ = require('underscore'),
    fs = require('fs');


gulp.task('lint', function () {
    gulp.src('./client/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .on('end', done);
});

gulp.task('less', function () {
    gulp.src('./client/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./client/css'))
        .on('end', done);
});

gulp.task('develop', function () {
    nodemon({
        script: 'app.js',
        ext: 'html js',
        env: {'NODE_ENV': 'development'},
        nodeArgs: ['--debug'],
        ignore: ['ignored.js']
    }).on('restart', function () {
        util.log(util.colors.cyan('nodemon restarted'));
    }).on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('./client/less/*.less', ['less'])
        .on('end', done);
});

gulp.task('bower', function (done) {
    bower().on('end', done);
});

gulp.task('minify-css', function (done) {
    gulp.src('./client/css/main.css')
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', done);
});

gulp.task('hooks', function (done) {
});

gulp.task('clean', function (done) {
    gulp.src('./dist/*')
        .pipe(clean())
        .on('end', done);
});

gulp.task('copy', function (done) {

});

//gulp.task('build', ['bower', 'clean', 'less', 'minify-css', 'copy'], function (done) {
gulp.task('build', function (done) {

});