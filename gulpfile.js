var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat-util');
var notify = require('gulp-notify');
var jsdoc = require("gulp-jsdoc");
var pkg = require('./package.json');
var gutil = require('gulp-util');
var path = require('path');
var mocha = require('gulp-mocha');

var banner = gutil.template('/**\n' +
' * <%= pkg.name %>\n' +
' * @version v<%= pkg.version %> - <%= now %>\n' +
' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
' */\n', {file: '', pkg: pkg, now: new Date().toISOString()});

function concatProcess(src) {
    var result = '// Source: ' + path.basename(this.path) + '\n';
    result += (src.trim() + '\n');
    result = result.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
    return result;
}

gulp.task('scripts', ['clean'], function () {
    return gulp.src(['src/NBT.js', 'src/UTF8Utils.js', 'src/NBT/Type.js', 'src/NBT/NBTBase.js', 'src/NBT/NBTNumber.js', 'src/NBT/NBTArray.js', 'src/NBT/*.js'])
        .pipe(concat('PowerNBT.js', {process: concatProcess}))
        .pipe(concat.header('(function(global, undefined) {\n"use strict";\n'))
        .pipe(concat.footer('\n})(this);\n'))
        .pipe(concat.header(banner))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(concat.header(banner))
        .pipe(gulp.dest('dist'));
});

gulp.task('jsdoc', ['scripts'], function () {
    return gulp.src(['./src/**/*.js','README.md'])
        .pipe(jsdoc.parser({}))
        .pipe(jsdoc.generator('./docs'))
});

gulp.task('test', ['scripts'], function () {
    return gulp.src('test/*.js')
        .pipe(mocha());
});

gulp.task('clean', function (cb) {
    return del(['dist', 'docs'], cb);
});

gulp.task('default', ['clean', 'scripts', 'test', 'jsdoc'], function(){
    gulp.src('')
        .pipe(notify({message: 'All tasks complete'}));
});