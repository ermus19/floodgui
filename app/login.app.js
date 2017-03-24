'use strict';

const Config = require('electron-config');
var config = new Config();

angular.module('login.app', ['login.controller', 'load.controller', 'rest.service', 'config.service']);
