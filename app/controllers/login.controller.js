'use strict';

angular.module('login.controller', [])

    .controller('login.controller', function ($scope, $window, $location, $timeout, Test, configService) {

        if (configService.getSafe()) {

            var location = configService.getLocation();
            $location.url('/previous');

            if (location == 'localhost') {

                $scope.location = 'This Computer!';

            } else {

                $scope.location = 'IP: ' + location;

            }

        }

        $scope.thisClicked = false;
        $scope.showLoading = false;
        $scope.showLoadingPrev = false;

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

            $location.url('/form');

        }


        $scope.onClickBackPrev = function () {

            configService.setSafe(false);
            $location.url('/login');

        }

        $scope.onClickPrev = function () {

            $scope.showLoadingPrev = true;

            $timeout(function () {

                if (!checkConnection(location)) {

                    $location.url('/login');

                }
            }, 1800);
        };


        var checkConnection = function (location) {

            Test('http://' + location + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

                configService.setSafe(true);
                configService.setLocation(location);
                $location.url('/home');

            }, function (response) {

                configService.setSafe(false);
                $window.alert("Can't connect to " + location);
                return false;

            });
        };

    });
