'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths}
        ).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
