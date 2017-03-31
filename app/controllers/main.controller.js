'use strict';

angular.module('main.controller', [])

    .controller('main.controller', function ($scope, $location, $interval, Test, configService, restService) {

        $scope.showHome = true;
        $scope.showDevices = false;
        $scope.showPorts = false;
        $scope.showAbout = false;
        $scope.showGraph = false;
        configService.setSafe(true);

        var location = configService.getLocation();

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

            restService.getMemory().query().$promise.then(function (data) {

                console.log(data.toJSON());
                $scope.freeMem = data.free;
                $scope.usedMem = data.total;

            }, function (error) {

                configService.setSafe(false);
                window.alert("Connection lost with " + location);
                $location.url('/login');
                $interval.cancel(conCheck);
                conCheck = undefined;

            });

        }, 5000);

    });