'use strict';

// Libs
require('jquery');
var angular = require('angular');
require('ng-infinite-scroll');

// Init angular module
var app = angular.module('app', [
	'infinite-scroll',
]);

// Include controllers
require('./controllers');
