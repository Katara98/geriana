'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css');

var path = {
    build: { 
        html: 'build/',
        css: 'build/style/',
        img: 'build/images/'
    },
    src: { 
        html: 'src/*.html', 
        style: 'src/style/*.css',
        img: 'src/images/*.*' 
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html)); 
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('build', [
    'html:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function(){
    gulp.watch(path.src.html, ['html:build']);
    gulp.watch(path.src.style, ['style:build']);
    gulp.watch(path.src.img, ['image:build']);
});

gulp.task('default', ['build', 'watch']);