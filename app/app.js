'use strict';

const Config = require('electron-config');
var config = new Config();

angular.module('myApp', ['myApp.login.controller', 'myApp.load.controller', 'rest.service.js']);
