'use strict';

const Config = require('electron-config');
var config = new Config();

angular.module('myApp', ['login.controller', 'load.controller', 'rest.service']);
