'use strict';

angular.module('login.controller', [])

    .controller('login.controller', function ($scope, $timeout, Test, configService) {

        $scope.showLoading = false;
        $scope.submitLoading = false;
        $scope.thisClicked = false;
        $scope.showForm = false;
        $scope.ipPattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

        $scope.onClickThis = function () {

            $scope.showLoading = true;
            $scope.thisClicked = true;

            Test('http://localhost:8080/wm/core/memory/json').query().$promise.then(function (data) {

                console.log(data.toJSON());
                $timeout(function () {
                    window.location.href = './main.view.html';
                    configService.setSafe(true);
                    configService.setLocation('localhost');
                }, 1000);

            }, function (error) {

                window.alert("Can't connect to localhost");
                $scope.showLoading = false;
                $scope.thisClicked = false;

            });

        };

        $scope.onClickOther = function () {

            $scope.showForm = true;

        }

        $scope.onClickBack = function () {

            $scope.showForm = false;
            $scope.ip = null;
            $scope.ipForm.$setPristine();

        }

        $scope.onClickSubmit = function () {

            $scope.submitLoading = true;
            $timeout(1800);

            Test('http://' + $scope.ip + ':8080/wm/core/memory/json').query().$promise.then(function (data) {

                console.log(JSON.stringify(data.toJSON()));
                window.location.href = './home.html';
                configService.setSafe(true);
                configService.setLocation($scope.ip);

            }, function (response) {

                window.alert("Can't connect to: " + $scope.ip);
                $scope.submitLoading = false;
                $scope.ip = null;
                $scope.ipForm.$setPristine();

            });
        };

        $scope.filterValue = function ($event) {

            var input = String.fromCharCode($event.keyCode);

            if ((isNaN(input) && input != '.') || ($event.keyCode == 32)) {

                $event.preventDefault();
                console.log("Input not valid");

            }
        };

    });
