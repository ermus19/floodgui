'use strict';

const Config = require('electron-config');
var config = new Config();

angular.module('main.app', ['main.controller', 'rest.service', 'config.service']);
