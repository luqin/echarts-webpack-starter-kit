import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import yargs from 'yargs';

import makeWebpackConfig from './webpack/makeconfig';
import webpackBuild from './webpack/build';
import webpackDevServer from './webpack/devserver';

const args = yargs
    .alias('p', 'production')
    .argv;

const runEslint = () => {
    return gulp.src([
        'gulpfile.babel.js',
        'src/**/*.js',
        'webpack/*.js',
        '!**/__tests__/*.*'
    ])
        .pipe(eslint())
        .pipe(eslint.format());
};

gulp.task('env', () => {
    const env = args.production ? 'production' : 'development';
    process.env.NODE_ENV = env; // eslint-disable-line no-undef
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production
    ? 'build-webpack-production'
    : 'build-webpack-dev'
]);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
    return runEslint();
});

gulp.task('eslint-ci', () => {
    // Exit process with an error code (1) on lint error for CI build.
    return runEslint().pipe(eslint.failAfterError());
});

gulp.task('test', (done) => {
    runSequence('eslint-ci', 'build-webpack-production', done);
});

gulp.task('server', ['env', 'build']);

gulp.task('default', ['server']);
