'use strict';

angular.module('ports.controller', [])

    .controller('ports.controller', function ($scope, $rootScope, $window, $interval, $location, $timeout, restService, devicesService, portsService) {

        $scope.showEmptyPorts = false;
        $scope.showPortsList = false;
        $scope.showPortsLoading = true;
        $scope.ports = [];

        var getPorts = $interval(function () {

            var ports = portsService.getPorts();
            var switchID = devicesService.getSwitchID();

            if (switchID !== undefined) {

                restService.getPorts().query().$promise.then(function (data) {

                    var ports = portsService.updatePorts(data);
                    portsService.setPorts(data);

                    if (ports.length != 0) {

                        $scope.ports = ports;
                        $scope.showPortsList = true;
                    }

                });

                restService.getPortsStats().query({ switchID: switchID }).$promise.then(function (data) {

                    $scope.ports = portsService.updatePortStats($scope.ports, data);

                });

                restService.getPortsState().query().$promise.then(function (data) {

                    $scope.ports = portsService.updatePortStates(switchID, $scope.ports, data);

                });


            } else {

                $location.url('/home');
                $rootScope.showMenu = false;

            }

        }, 1500);


        $scope.enablePort = function (portNumber) {

            var switchID = devicesService.getSwitchID();

            restService.enablePort().save({ dpid: switchID, port: portNumber }).$promise.then(function (data) {

                if (!data.success) {

                    $window.alert("Couldn't enable port: " + portNumber);

                }

            }, function (response) {

                $window.alert("Couldn't enable port: " + portNumber + "\n" + response.status + " " + response.statusText);

            });
        };

        $scope.disablePort = function (portNumber) {

            var switchID = devicesService.getSwitchID();

            restService.disablePort().save({ dpid: switchID, port: portNumber }).$promise.then(function (data) {

                if (!data.success) {

                    $window.alert("Couldn't disable port: " + portNumber);

                }

            }, function (response) {

                $window.alert("Couldn't disable port: " + portNumber + "\n" + response.status + " " + response.statusText);

            });
        };

        $scope.$on('$destroy', function () {
            $interval.cancel(getPorts);
        });

    });