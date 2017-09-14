"use strict";
var teen_process = require('teen_process');
var system = require('appium-support').system;

var mvnCmd = system.isWindows() ? 'mvn.cmd' : 'mvn';

var gulp = require('gulp'),
    boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);

gulp.task('maven-clean', function () {
  return teen_process.exec(mvnCmd, ['clean'], {cwd: 'bootstrap'});
});

gulp.task('maven-install', ['maven-clean'], function () {
  return teen_process.exec(mvnCmd, ['install'], {cwd: 'bootstrap'});
});

gulp.task('maven', ['maven-clean', 'maven-install']);

boilerplate({
  build: 'appium-android-bootstrap',
  jscs: false,
  extraPrepublishTasks: ['maven'],
  e2eTest: {android: true},
  testTimeout: 20000
});
