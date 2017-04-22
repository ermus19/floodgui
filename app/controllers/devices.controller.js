'use strict';

angular.module('devices.controller', [])

    .controller('devices.controller', function ($scope, $interval, $timeout, devicesService) {

        $scope.showEmptyDevices = false;
        $scope.showDevicesList = false;
        $scope.showDevicesLoading = true;

        var updateDevices = $interval(function () {

            var devices = devicesService.getDevices();
            $scope.showDevicesLoading = false;

            if (devices.lenght === 0) {

                $scope.showEmptyDevices = true;

            } else {

                $timeout(function () {
                    $scope.devices = devices;
                    $scope.showDevicesList = true;
                    $scope.showEmptyDevices = false;
                });

            }

        }, 10000);

        $scope.$on('$destroy', function () {
            $interval.cancel(updateDevices);
        });

    });