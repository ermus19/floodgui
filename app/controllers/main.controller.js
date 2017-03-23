'use strict';

angular.module('main.controller', [])

    .controller('main.controller', function ($scope) {

        $scope.showHome = true;
        $scope.showDevices = false;
        $scope.showPorts = false;
        $scope.showAbout = false;

        console.log($scope.showAbout);

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

    });