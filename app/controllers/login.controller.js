'use strict';

angular.module('login.controller', [])

    .controller('login.controller', function ($scope, $location, $timeout, Test, configService) {

        if (configService.getSafe()) {

            var location = configService.getLocation();
            if (location == 'localhost') {

                $scope.location = 'This Computer!';

            } else {

                $scope.location = 'IP: ' + location;

            }

            $scope.showPrev = true;
            $scope.showForm = false;
            $scope.showButtons = false;
        }else{
            $scope.showPrev = false;
            $scope.showForm = false;
            $scope.showButtons = true;
        }
        $scope.thisClicked = false;
        $scope.submitLoading = false;
        $scope.showLoading = false;
        $scope.showLoadingPrev = false;
        $scope.ipPattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

        $scope.onClickThis = function () {

            $scope.showLoading = true;
            $scope.thisClicked = true;
            $timeout(function () {
                if (!checkConnection('localhost')) {
                    $scope.showLoading = false;
                    $scope.thisClicked = false;
                }
            }, 1800);

        };

        $scope.onClickOther = function () {

            $scope.showForm = true;

        }

        $scope.onClickBack = function () {
            $scope.showForm = false;
            $scope.ip = null;
            $scope.ipForm.$setPristine();

        }

        $scope.onClickBackPrev = function () {

            $scope.showButtons = true;
            $scope.showPrev = false;
            configService.setSafe(false);

        }

        $scope.onClickPrev = function () {

            $scope.showLoadingPrev = true;

            $timeout(function () {
                if (!checkConnection(location)) {
                    $scope.showButtons = true;
                    $scope.showPrev = false;
                }
            }, 1800);
        };

        $scope.onClickSubmit = function () {

            $scope.submitLoading = true;
            $timeout(function () {
                if (!checkConnection($scope.ip)) {
                    $scope.submitLoading = false;
                    $scope.ip = null;
                    $scope.ipForm.$setPristine();
                }
            }, 1800);
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
                $scope.showPrev = false;
                $scope.showForm = false;
                $scope.showButtons = true;
                $location.url('/home');
            }, function (response) {

                window.alert("Can't connect to: " + location);
                return false;

            });
        };

    });
