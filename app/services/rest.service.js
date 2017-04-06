'use strict';

angular.module('rest.service', ['ngResource'])

    .factory('Test', ['$resource', function ($resource) {
        return function (ip) {
            return $resource(ip, {}, {
                query: {
                    method: 'GET',
                    timeout: 5000
                }
            });
        }
    }])

    .factory('restService', ['$resource', 'configService', function ($resource, configService) {
        return {
            getMemory: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/core/memory/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            },
            getApiHealth: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/core/health/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            },
            getVersion: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/core/version/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            },
            getUptime: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/core/system/uptime/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            },
            getFirewallStatus: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/firewall/module/status/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            }
        }
    }]);