'use strict';

angular.module('load.controller', [])

    .controller('load.controller', function ($scope, $timeout, Test, configService) {

        var location = configService.getLocation();

        if (location == 'localhost') {
            $scope.location = "Your computer!";
        } else {
            $scope.location = location;
        }

        Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

            console.log(data.toJSON());
            $timeout(function () {
                window.location.href = './main.view.html';
                configService.setSafe(true);
                configService.configSetLocation(location);
            }, 1000);

        }, function (error) {

            $timeout(function () {
                configService.setSafe(false);
                window.alert("Can't connect to " + location);
                window.location.href = './login.view.html';
            }, 4000);
            
        });


    });