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
    buster = require('gulp-buster'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    amdOptimize = require('amd-optimize'),
    rename = require('gulp-rename'),
    copy2 = require('gulp-copy2'),
    sh = require('shelljs'),
    path = require('path'),
    Q = require('q'),
    _ = require('underscore'),
    fs = require('fs'),
    config = require('./config');

// region lint

gulp.task('lint', function () {
    return gulp.src([
        '*.js',
        'server/**/*',
        'client/root/app/**/*.js',
        'client/blog/app/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// endregion lint
// region less

gulp.task('less:root', ['bower'], function (done) {
    return gulp.src('client/root/less/*.less')
        .pipe(less())
        .on('error', function (err) {
            util.log(util.colors.red(err));
        })
        .pipe(gulp.dest('client/root/css/'));
});

gulp.task('less:blog', ['bower'], function (done) {
    return gulp.src('client/blog/less/*.less')
        .pipe(less())
        .on('error', function (err) {
            util.log(util.colors.red(err));
        })
        .pipe(gulp.dest('client/root/css/'));
});

// endregion less
// region nodemon

gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        ext: 'js json',
        ignore: ['node_modules/*', 'client/*', 'dist/*'],
        env: {'NODE_ENV': 'DEVELOPMENT'}
    }).on('restart', function () {
        util.log(util.colors.cyan('nodemon restarted'));
    });
});

// endregion nodemon
// region watch

gulp.task('watch', function () {
    gulp.watch('./client/**/*.less', ['less']);
    gulp.watch('./githook.hb', ['git-hook']);
});

// endregion watch
// region bower

gulp.task('bower', ['clean'], function (done) {
    return bower();
});

// endregion bower
// region minify-css

gulp.task('minify-css:root', ['less:root'], function () {
    return gulp.src('client/root/css/main.css')
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('dist/root/css/'));
});

gulp.task('minify-css:blog', ['less:blog'], function () {
    return gulp.src('./client/blog/css/main.css')
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./dist/blog/css/'));
});

gulp.task('minify-css', ['minify-css:root', 'minify-css:blog']);

// endregion minify-css
// region git-hook

gulp.task('git-hook', function (done) {
    gulp.src('githook.hb')
        .pipe(rename('pre-commit'))
        .pipe(gulp.dest('.git/hooks/'))
        .on('end', done);
});

// endregion git-hook
// region clean

gulp.task('clean', function () {
    return gulp.src('./dist/*')
        .pipe(clean());
});

// endregion clean
// region compress

gulp.task('compress:requirejs', ['bower'], function () {
    gulp.src('client/lib/requirejs/require.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib/'));
});

gulp.task('compress:root', ['bower'], function () {
    return gulp.src('client/root/*').
        pipe(amdOptimize('init-build', {
            baseUrl: 'client/root/',
            configFile: 'client/root/init-build-config.js',
            exclude: [
                'jquery',
                'underscore',
                'crypto',
                'angular',
                'angular-resource',
                'angular-route',
                'angular-animate',
                'angular-translate'
            ]
        }))
        .pipe(concat('init.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/root'));
});

gulp.task('compress:blog', ['bower'], function () {
    return gulp.src('client/blog/*').
        pipe(amdOptimize('init', {
            baseUrl: 'client/blog/',
            configFile: 'client/blog/config.js'
        }))
        .pipe(concat('init.js'))
        .pipe(gulp.dest('dist/root'));
});

gulp.task('compress', ['compress:requirejs', 'compress:root'/*, 'compress:blog'*/]);

// endregion compress
// region copy

gulp.task('copy:common', ['bower'], function () {
    return copy2([
        {src: 'client/lib/html5shiv/dist/html5shiv.*', dest: 'dist/lib/'},
        {src: 'client/lib/respond/dest/respond.*', dest: 'dist/lib/'},
        {src: 'client/lib/jquery/dist/jquery.*', dest: 'dist/lib/'},
        {src: 'client/lib/underscore/underscore*', dest: 'dist/lib/'},
        {src: 'client/lib/crypto/crypto.min.*', dest: 'dist/lib/'},
        {src: 'client/lib/angular/angular.min.*', dest: 'dist/lib/'},
        {src: 'client/lib/angular-resource/angular-resource.*', dest: 'dist/lib/'},
        {src: 'client/lib/angular-route/angular-route.*', dest: 'dist/lib/'},
        {src: 'client/lib/angular-animate/angular-animate.*', dest: 'dist/lib/'},
        {src: 'client/lib/angular-translate/angular-translate.*', dest: 'dist/lib/'},
        {src: 'client/*.*', dest: 'dist/'}
    ]);
});

gulp.task('copy:root', ['clean'], function () {
    return copy2([
        {src: 'client/root/index.html', dest: 'dist/root/'},
        {src: 'client/root/favicon.ico', dest: 'dist/root/'},
        {src: 'client/root/app/views/*.*', dest: 'dist/root/app/views/'},
        {src: 'client/root/app/partials/*.*', dest: 'dist/root/app/partials/'}
    ]);
});

gulp.task('copy:blog', ['clean'], function () {
    return copy2([
        {src: 'client/blog/index.html', dest: 'dist/blog/'},
        {src: 'client/blog/favicon.ico', dest: 'dist/blog/'},
        {src: 'client/blog/app/views/*', dest: 'dist/blog/app/views/'},
        {src: 'client/blog/app/partials/*', dest: 'dist/blog/app/partials/'}
    ]);
});

gulp.task('copy', ['copy:common', 'copy:root'/*, 'copy:blog'*/]);

// endregion copy
// region integration

gulp.task('develop', ['nodemon', 'watch', 'git-hook']);

gulp.task('build', ['copy', 'minify-css', 'compress']);

gulp.task('publish', ['build'], function () {
    return gulp.src('dist/**/*')
        .pipe(buster({
            fileName: config.BUSTER
        }))
        .pipe(gulp.dest('dist'));
});

// endregion integration