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
    }]);