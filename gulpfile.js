/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

var gulp = require('gulp');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var buildPath = "./bin";

var modules = [
    'pixi.js/**/pixi.min.js'
];

var styles = [
    'golden-layout/**/*.css'
];

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

gulp.task('build', [ 'templates', 'modules', 'css' ]);