'use strict';

angular.module('ports.controller', [])

    .controller('ports.controller', function ($scope, $interval, $timeout, restService, devicesService, portsService) {

        $scope.showEmptyPorts = false;
        $scope.showPortsList = false;
        $scope.showPortsLoading = true;

        $scope.initGetPorts = function () {

            var getPorts = $interval(function () {

                var ports = portsService.getPorts();
                var switchID = devicesService.getSwitchID();

                if (switchID !== undefined) {

                    restService.getPorts().query().$promise.then(function (data) {

                        var ports = portsService.updatePorts(data);
                        portsService.setPorts(data);
                        $scope.ports = ports;

                    });

                    $interval.cancel(getPorts);
                    $scope.startPortsUpdate();

                }
            });
        }

        $scope.startPortsUpdate = function () {

            var updatePorts = $interval(function () {

                var switchID = devicesService.getSwitchID();
                restService.getPortsStats().query({ switchID: switchID }).$promise.then(function (data) {

                    console.log($scope.ports);
                    $scope.ports = portsService.updatePortStats($scope.ports, data);
                    console.log($scope.ports);
                    $scope.showPortsList = true;

                });

                $scope.showPortsLoading = false;

                if (ports.lenght === 0) {

                    $scope.showEmptyPorts = true;

                } else if (switchID === undefined) {

                    $location.url('home');
                    $rootScope.showMenu = false;
                    $interval.cancel(updatePorts);
                }

            }, 2500);
        }

        $scope.initGetPorts();

        $scope.$on('$destroy', function () {
            $interval.cancel(updatePorts);
            $interval.cancel(getPorts);
        });

    });