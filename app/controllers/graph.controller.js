'use strict';

angular.module('graph.controller', ['ngVis'])

    .controller('graph.controller', function ($scope, $interval, $timeout, restService, devicesService, VisDataSet) {

        $scope.showLoading = false;
        $scope.btnDisabled = true;

        var network;

        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);


        var graphDraw = $interval(function () {

            var old_devices = devicesService.getDevices();
            var switchID = devicesService.getSwitchID();

            restService.getDevices().query().$promise.then(function (data) {

                if (old_devices.length === 0) {

                    var devices = devicesService.fillDevices(data);
                    var size = devices.length;
                    var ports = devicesService.getPorts();

                    nodes.clear();
                    edges.clear();

                    nodes.add({ id: 0, label: 'SWITCH', image: '../app/assets/icons/switch.png', shape: 'image' });

                    for (var j = 0; j < ports; j++) {
                        var portID = j + 1;
                        nodes.add({ id: portID, label: 'PORT: ' + (portID), group: 'ports' });
                        edges.add({ from: 0, to: portID, color: { color: '#fffff', opacity: 0.3 } });
                    }

                    var nodeID = 100;

                    for (var i = 0; i < size; i++) {
                        var port = parseInt(devices[i].port);
                        if (!isNaN(port)) {
                            nodeID = nodeID + 1;
                            nodes.add({ id: nodeID, label: 'DEVICE ' + i, group: 'devices' });
                            edges.add({ from: nodeID, to: port, color: { color: '#fffff', opacity: 0.3 } });
                        }
                    }
                }
            });

        }, 10000);

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

        $scope.graphOptions = {
            autoResize: true,
            width: '60%',
            height: '570px',
            groups: {
                switch: {
                    font: {
                        face: 'times',
                        size: 14,
                        strokeWidth: 1.5,
                        strokeColor: '#000000',
                        bold: {
                            color: '#000000'
                        }
                    }
                },
                ports: {
                    font: {
                        face: 'times',
                        size: 12,
                        strokeWidth: 0.5,
                        strokeColor: '#000000',
                        bold: {
                            color: '#000000'
                        }
                    },
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf150',
                        size: 20,
                        color: '#00000'
                    }
                },
                devices: {
                    font: {
                        face: 'times',
                        size: 10,
                        strokeWidth: 0.5,
                        strokeColor: '#000000',
                        bold: {
                            color: '#000000'
                        }
                    },
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf233',
                        size: 25,
                        color: '#000000'
                    }
                }
            }
        };

        $scope.graphData = {
            nodes: nodes,
            edges: edges
        };

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

        $scope.$on('$destroy', function () {
            $interval.cancel(graphDraw);
        });
    });