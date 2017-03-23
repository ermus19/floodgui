'use strict';

angular.module('load.controller', [])

    .controller('load.controller', function ($scope, $timeout, Test) {

        console.log(config.get('location'));

        var location = config.get('location');

        if (location == 'localhost') {
            $scope.location = "Your computer!";
        } else {
            $scope.location = location;
        }

        Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

            console.log(data.toJSON());
            $timeout(function () {
                window.location.href = './main.view.html';
                config.set('set', true);
                config.set('location', location);
            }, 4000);

        }, function (error) {

            $timeout(function () {
                config.set('set', false);
                window.alert("Can't connect to " + location);
                window.location.href = './login.view.html';
            }, 4000);
            
        });


    });