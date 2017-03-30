'use strict';

angular.module('form.controller', [])

    .controller('form.controller', function ($scope, $window, $location, $timeout, Test, configService) {

        $scope.ipPattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

        $scope.onClickBack = function () {

            $scope.ip = null;
            $scope.ipForm.$setPristine();
            $location.url('/login');

        }

        $scope.onClickSubmit = function () {

            $scope.submitLoading = true;

            $timeout(checkConnection($scope.ip), 1800);

        };

        $scope.filterValue = function ($event) {

            var input = String.fromCharCode($event.keyCode);

            if ((isNaN(input) && input != '.') || ($event.keyCode == 32)) {

                $event.preventDefault();
                console.log("Input not valid");

            }
        };

        var checkConnection = function (location) {

            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

                configService.setSafe(true);
                configService.setLocation(location);
                $location.url('/home');

            }, function (response) {

                configService.setSafe(false);
                $window.alert("Can't connect to: " + location);
                $scope.ip = null;
                $scope.submitLoading = false;
            });
        };

    });