'use strict';

angular.module('devices.controller', [])

    .controller('devices.controller', function ($scope, $interval, devicesService) {

        
        var getDevices = $interval(function () {
            
            $scope.devices = devicesService.getDevices();
            console.log($scope.devices);

        }, 3000);
        

    });