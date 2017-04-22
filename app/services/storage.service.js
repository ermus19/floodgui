'use strict';

angular.module('storage.service', ['ngStorage'])

    .factory('storageService', function ($localStorage) {
        return {
            setSafe: function (state) {
                if (typeof (state) === "boolean") {
                    $localStorage.state = state;
                }
            },
            getSafe: function () {
                return $localStorage.state;
            },
            setLocation: function (location) {
                $localStorage.location = location;
            },
            getLocation: function () {
                return $localStorage.location;
            }
        }
    });