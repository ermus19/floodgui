'use strict';

angular.module('ports.controller', [])

    .controller('ports.controller', function ($scope, $interval, $timeout, restService, devicesService, portsService) {

        $scope.showEmptyPorts = false;
        $scope.showPortsList = false;
        $scope.showPortsLoading = true;
        $scope.ports = [];

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


                    $timeout(function () {

                        $scope.ports = portsService.updatePortStats($scope.ports, data);

                        if ($scope.ports.length === 0) {

                            $scope.showEmptyPorts = true;

                        } else {

                            $scope.showPortsList = true;

                        }

                    });

                });

                restService.getPortsState().query().$promise.then(function (data) {

                    $timeout(function () {

                        $scope.ports = portsService.updatePortStates(switchID, $scope.ports, data);

                        if ($scope.ports.length === 0) {

                            $scope.showEmptyPorts = true;

                        } else {
                            $scope.showPortsList = true;

                        }
                    });
                });

                $scope.showPortsLoading = false;

                if (switchID === undefined) {

                    $location.url('/home');
                    $rootScope.showMenu = false;
                }

            }, 1000);
        }

        $scope.enablePort = function (portNumber) {

            var switchID = devicesService.getSwitchID();

            restService.enablePort().save({ dpid: switchID, port: portNumber }).$promise.then(function (data) {

                if (!data.success) {
                    $window.alert("Couldn't enable port " + portNumber);
                }

            }, function (error) {

                $window.alert("Couldn't enable port " + portNumber + "\n" + error);

            });
        };

        $scope.disablePort = function (portNumber) {

            var switchID = devicesService.getSwitchID();

            restService.disablePort().save({ dpid: switchID, port: portNumber }).$promise.then(function (data) {

                if (!data.success) {
                    $window.alert("Couldn't disable port " + portNumber);
                }

            }, function (error) {

                $window.alert("Couldn't disable port " + portNumber + "\n" + error);

            });
        };

        $scope.initGetPorts();

        $scope.$on('$destroy', function () {
            $interval.cancel(getPorts);
            $interval.cancel(updatePorts);
        });

    });