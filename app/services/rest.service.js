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

    .factory('restService', ['$resource', 'configService', function ($resource, configService){
        return{
            getMemory: function () {
                return $resource('http://' + configService.getLocation() + ':8080/wm/core/memory/json', {}, {
                    query: {
                        method: 'GET',
                        timeout: 5000
                    }
                });
            }
        } 
    }]);