'use strict';

angular.module('rest.service.js',['ngResource'])

.factory('Test', ['$resource', function ($resource) {
    return function (ip) {
        return $resource(ip, {}, {
            query: {
                method:'GET',
                timeout: 5000
            }
    });
}}]);