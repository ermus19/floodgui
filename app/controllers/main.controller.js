'use strict';

angular.module('main.controller', [])

    .controller('main.controller', function ($scope, $window, $location, $interval, Test, storageService) {

        $scope.showHome = true;
        $scope.showDevices = false;
        $scope.showPorts = false;
        $scope.showAbout = false;
        $scope.showGraph = false;
        var devices = [];
        
        storageService.setSafe(true);

        var location = storageService.getLocation();

        $scope.changeView = function (view) {

            if (view === 'home') {
                $scope.showHome = true;
                $scope.showDevices = false;
                $scope.showPorts = false;
                $scope.showAbout = false;

            } else if (view === 'devices') {
                $scope.showHome = false;
                $scope.showDevices = true;
                $scope.showPorts = false;
                $scope.showAbout = false;

            } else if (view === 'ports') {
                $scope.showHome = false;
                $scope.showDevices = false;
                $scope.showPorts = true;
                $scope.showAbout = false;

            } else if (view === 'about') {
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
            
            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data){

            });

            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

            }, function (response) {

                storageService.setSafe(false);
                $window.alert("Connection lost with " + location);
                $location.url('/login');
                $interval.cancel(conCheck);
                conCheck = undefined;

            });
        }, 5000);

        $scope.$on('$destroy', function() {
            $interval.cancel(conCheck);
        });

    });