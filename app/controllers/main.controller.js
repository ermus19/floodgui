'use strict';

angular.module('main.controller', [])

    .controller('main.controller', function ($scope, $interval, Test, configService) {

        $scope.showHome = true;
        $scope.showDevices = false;
        $scope.showPorts = false;
        $scope.showAbout = false;


        $scope.changeView = function (view) {

            if (view === 'home') {
                console.log("home");
                $scope.showHome = true;
                $scope.showDevices = false;
                $scope.showPorts = false;
                $scope.showAbout = false;

            } else if (view === 'devices') {
                console.log("devices");
                $scope.showHome = false;
                $scope.showDevices = true;
                $scope.showPorts = false;
                $scope.showAbout = false;

            } else if (view === 'ports') {
                console.log("ports");
                $scope.showHome = false;
                $scope.showDevices = false;
                $scope.showPorts = true;
                $scope.showAbout = false;

            } else if (view === 'about') {
                console.log("about");
                $scope.showHome = false;
                $scope.showDevices = false;
                $scope.showPorts = false;
                $scope.showAbout = true;

            } else {

                $scope.showHome = true;
                $scope.showDevices = false;
                $scope.showPorts = false;
                $scope.showAbout = false;

            }
        }

        var conCheck= $interval(function () {

            var location = configService.getLocation();

            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

                console.log(data.toJSON());

            }, function (error) {

                configService.setSafe(false);
                window.alert("Connection lost with " + location);
                window.location.href = './login.view.html';
                $interval.cancel(conCheck);
                conCheck = undefined;

            });

        }, 5000);

    });