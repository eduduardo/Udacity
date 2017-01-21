'use strict'
const gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    uglify = require("gulp-uglify"),
    inline = require('gulp-inline'),
    imagemin = require('gulp-imagemin');

// html minify
gulp.task('minify-html-index', function(){
    gulp.src('./*.html')
        .pipe(inline({css: [minifyCss], disabledTypes: ['img'], js: [uglify]}))
        .pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify-html-pizza', function(){
    gulp.src('./views/*.html')
        .pipe(inline({css: [minifyCss], disabledTypes: ['img', 'js'], base: 'views/'}))
        .pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views/'));
});

// css minify
gulp.task('minify-css-index', function(){
    gulp.src('./css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('minify-css-pizza', function(){
    gulp.src('./views/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/views/css'))
});

// js minify
gulp.task('minify-js-index', function(){
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-js-pizza', function(){
    gulp.src('./views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'))
});

// img minify
gulp.task('minify-img-index', function(){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('minify-img-pizza', function(){
    gulp.src('views/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/views/images/'))
});


var defaultTasks = ['minify-html-index', 'minify-html-pizza', 'minify-css-index',
                    'minify-css-pizza', 'minify-js-index', 'minify-js-pizza', 'minify-img-index',
                    'minify-img-pizza'];

gulp.task('default', defaultTasks);
