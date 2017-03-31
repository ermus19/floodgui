'use strict';

angular.module('graph.controller', ['ngVis'])

    .controller('graph.controller', function ($scope, $timeout, VisDataSet) {

        $scope.showLoading = false;
        $scope.btnDisabled = true;
        var network;
        var nodes = VisDataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' }
        ]);
        var edges = VisDataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
        ]);

        var graphZoom = function ($event) {
            $scope.btnDisabled = false;
            $scope.$apply();
            var options = {
                offset: { x: 0, y: 0 },
                duration: 500,
                easingFunction: 'linear'
            };

            if ($event.scale < 0.2) {
                console.log(network);
                network.fit({ animation: options });
            }
        };

        var enableRestore = function (){
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
            $timeout(function (){
                $scope.showLoading = false;
                $scope.btnDisabled = true;
            }, 800);
        };

        $scope.graphOptions = {
            autoResize: true,
            width: '60%',
            height: '570px'
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
    });