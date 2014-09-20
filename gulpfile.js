var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var server = require('./server');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');


var distFolder = 'dist';

var filesToMove = ['./src/fonts/**'];

gulp.task('clean', function () {
    return gulp.src(['./' + distFolder + '/**'], {
        read: false
    }).pipe(clean());
});

gulp.task('fonts', function () {
    return gulp.src(['./src/fonts/**']).pipe(gulp.dest(distFolder + '/css/fonts/'));
});

gulp.task('html', function () {
    return gulp.src(['./src/index.html']).pipe(gulp.dest(distFolder));
});


gulp.task('scripts', function () {

    return gulp.src('./node_modules/app/main.js', {
        read: false
    }).pipe(browserify({
        transform: ['jstify'],
        shim: {
            'jquery.bootstrap.modal': {
                path: './node_modules/app/vendor/bootstrap/modal.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }
            }
        },
        debug: false
    })).pipe(gulp.dest('./' + distFolder + '/js'));
});

gulp.task('styles', function () {

    return gulp.src('./src/scss/styles.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: './src/scss',
            css: './dist/css'
        }))
        .pipe(gulp.dest('./' + distFolder + '/css'));

});

gulp.task('default', ['build'], function () {
    var servers = server(3000, 35729);

    gulp.watch('./node_modules/app/**', function (evt) {
        gulp.run('scripts', function () {
            servers.lr.changed({
                body: {
                    files: ['js/main.js']
                }
            });
        });
    });

    gulp.watch('./src/scss/**', function (evt) {
        gulp.run('styles', function () {
            servers.lr.changed({
                body: {
                    files: ['css/styles.css']
                }
            });
        });
    });

});

gulp.task('build', function (cb) {
    runSequence('clean', ['fonts', 'html', 'styles', 'scripts'], cb);
});
