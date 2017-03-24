'use strict';

angular.module('config.service', [])

    .factory('configService', function () {
        return {
            setSafe: function (state) {
                if (typeof (state) === "boolean") {
                    config.set('safe', state);
                }
            },
            getSafe: function () {
                return config.get('safe');
            },
            setLocation: function (location) {
                config.set('location', location);
            },
            getLocation: function () {
                return config.get('location');
            }
        }
    });