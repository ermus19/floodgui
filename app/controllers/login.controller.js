'use strict';

angular.module('login.controller', [])

    .controller('login.controller', function ($scope, $window, $location, $timeout, Test, storageService) {

        if (storageService.getSafe()) {

            var location = storageService.getLocation();
            $location.url('/previous');

            if (location == 'localhost') {

                $scope.location = 'This Computer!';

            } else {

                $scope.location = 'IP: ' + location;

            }

        } else {

            $location.url('/login');
        }

        $scope.thisClicked = false;
        $scope.showLoading = false;
        $scope.showLoadingPrev = false;

        $scope.onClickThis = function () {

            $scope.showLoading = true;
            $scope.thisClicked = true;

            $timeout(function () {

                if (!$scope.checkConnection('localhost')) {

                    $scope.showLoading = false;
                    $scope.thisClicked = false;

                }

            }, 1800);

        };

        $scope.onClickOther = function () {

            $location.url('/form');

        }


        $scope.onClickBackPrev = function () {

            storageService.setSafe(false);
            $location.url('/login');

        }

        $scope.onClickPrev = function () {

            $scope.showLoadingPrev = true;
            $timeout($scope.checkConnection(location), 1800);

        };


        $scope.checkConnection = function (location) {

            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

                storageService.setSafe(true);
                storageService.setLocation(location);
                $location.url('/home');

            }, function (response) {

                storageService.setSafe(false);
                $window.alert("Can't connect to " + location);
                $location.url('/login');
                return false;

            });
        };

    });
