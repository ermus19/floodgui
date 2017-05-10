'use strict';

angular.module('devices.controller', [])

    .controller('devices.controller', function ($scope, $interval, $timeout, devicesService) {

        $scope.showEmptyDevices = false;
        $scope.showDevicesList = false;

        var updateDevices = $interval(function () {

            var devices = devicesService.getDevices();

            if (devices.length === 0) {

                $scope.showEmptyDevices = true;

            } else {

                $timeout(function () {
                    $scope.devices = devices;
                    $scope.showDevicesList = true;
                    $scope.showEmptyDevices = false;
                });

            }

        }, 6000);

        $scope.$on('$destroy', function () {
            $interval.cancel(updateDevices);
        });

    });