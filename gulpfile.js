var gulp = require('gulp');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var buildPath = "./bin";

var modules = [
    'chart.js/**/Chart.min.js',
    'golden-layout/**/goldenlayout.min.js',
    'jquery/**/jquery.min.js',
    'pixi.js/**/pixi.min.js'
];

var styles = [
    'golden-layout/**/goldenlayout-base.css',
    'golden-layout/**/goldenlayout-dark-theme.css'
];

var libs = [
    'protobuf-3.4.0/google-protobuf.js',
];

/* External libraries */
gulp.task("libs", () => {
    return gulp.src(libs, {cwd: "libs/**"})
        .pipe(flatten())
		.pipe(gulp.dest(`${buildPath}/libs`));
});

/* Node modules */
gulp.task("modules", () => {
    return gulp.src(modules, {cwd: "node_modules/**"})
        .pipe(flatten())
		.pipe(gulp.dest(`${buildPath}/libs`));
});

gulp.task('templates', () => {
	return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest(buildPath));
});

gulp.task('css', () => {
    return gulp.src(styles, {cwd: "node_modules/**"})
        .pipe(flatten())
        .pipe(gulp.dest(`${buildPath}/styles`));
});

gulp.task('build', [ 'templates', 'modules', 'libs', 'css' ]);