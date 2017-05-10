'use strict';

angular.module('graph.controller', ['ngVis'])

    .controller('graph.controller', function ($scope, $rootScope, $location, $interval, $timeout, restService, graphService, devicesService, VisDataSet) {

        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);

        $scope.showLoading = false;
        $scope.btnDisabled = true;
        var network, nodes, edges;

        $scope.startCheckSwitchID = function () {

             $scope.checkSwitchID = $interval(function () {

                var switchID = devicesService.getSwitchID();

                if (switchID != undefined) {

                    restService.getDevices().query().$promise.then(function (data) {

                        var newPortDevices = devicesService.getPortCount();
                        var graphData = graphService.getGraphData(newPortDevices, nodes, edges);

                        nodes = graphData[0];
                        edges = graphData[1];

                    });

                    $scope.startGraphUpdate();
                    $interval.cancel($scope.checkSwitchID);

                } 
            });
        }

        $scope.startGraphUpdate = function () {

            var graphUpdate = $interval(function () {

                restService.getDevices().query().$promise.then(function (data) {

                    var oldPortDevices = devicesService.getPortCount();
                    var devices = devicesService.updateDevices(data);
                    devicesService.setDevices(devices.slice(0));
                    var newPortDevices = devicesService.getPortCount();
                    var switchID = devicesService.getSwitchID();

                    if (devices.length != 0 && switchID != undefined) {

                        var graphData = graphService.updateGraphData(newPortDevices, oldPortDevices, nodes, edges);

                        nodes = graphData[0];
                        edges = graphData[1];

                        $rootScope.showMenu = true;

                    } else if (switchID === undefined) {

                        $rootScope.showMenu = false;
                        $location.url('home');
                        nodes.clear();
                        edges.clear();
                        $interval.cancel(graphUpdate);
                        $scope.startCheckSwitchID();

                    }
                });

            }, 10000);
        }

        $scope.startCheckSwitchID();

        var graphZoom = function ($event) {
            $scope.btnDisabled = false;
            $scope.$apply();
            var options = {
                offset: { x: 0, y: 0 },
                duration: 500,
                easingFunction: 'linear'
            };

            if ($event.scale < 0.2) {
                network.fit({ animation: options });
            }
        };

        var enableRestore = function () {
            $scope.btnDisabled = false;
            $scope.$apply();
        }

        $scope.graphFit = function () {

            $scope.showLoading = true;
            $scope.btnDisabled = true;
            var options = {
                offset: { x: 0, y: 0 },
                duration: 800,
                easingFunction: 'linear'
            };
            network.fit({ animation: options });
            $timeout(function () {
                $scope.showLoading = false;
                $scope.btnDisabled = true;
            }, 800);
        };

        $scope.graphOptions = graphService.getGraphOptions();

        $scope.graphEvents = {
            onload: function (network_object) {
                network = network_object;
            },
            zoom: graphZoom,
            hold: enableRestore,
            dragStart: enableRestore,
            select: enableRestore,
            resize: $scope.graphFit
        };

        $scope.graphData = {
            nodes: nodes,
            edges: edges
        };

        $scope.$on('$destroy', function () {
            $interval.cancel($scope.graphUpdate);
            $interval.cancel($scope.checkSwitchID);
        });
    });