'use strict';

angular.module('graph.service', [])

    .factory('graphService', [function () {

        var nodesID = [];
        var switchImage = '../app/assets/icons/switch.png';
        var portImage = '../app/assets/icons/ports.png';
        var hostIcon = '\uf233';

        function _getGraphData(portdeviceNodes, nodes, edges) {

            var nodeID = 100;

            if (portdeviceNodes.length === 0) {

                nodes.add({ id: 0, group: 'switch' });
                return [nodes, edges];

            } else {

                nodes.add({ id: 0, group: 'switch' });

                for (var i = 0; i < portdeviceNodes.length; i++) {

                    var portID = i + 1;
                    nodes.add({ id: portID, label: 'PORT: ' + (portID), group: 'ports' });
                    edges.add({ from: 0, to: portID, color: { color: '#fffff', opacity: 0.3 } });
                    nodesID.push(portID);

                    for (var j = 0; j < portdeviceNodes[i]; j++) {
                        nodeID += 1;
                        nodes.add({ id: nodeID, label: 'DEVICE', group: 'devices' });
                        edges.add({ from: nodeID, to: portID, color: { color: '#fffff', opacity: 0.3 } });
                        nodesID.push(nodeID);
                    }

                }
                return [nodes, edges];
            }
        }

        function _updateGraphData(newPortDevices, oldPortDevices, nodes, edges) {

            var oldHosts = 0;
            var oldPorts = 0;
            var newHosts = 0;
            var newPorts = 0;

            if(newPortDevices.length === 0 && oldPortDevices.length === 0){
                return [nodes, edges];
            }

            for (var i = 0; i < oldPortDevices.length; i++) {
                oldHosts += parseInt(oldPortDevices[i]);
                oldPorts += 1;
            }

            for (var i = 0; i < newPortDevices.length; i++) {
                newHosts += parseInt(newPortDevices[i]);
                newPorts += 1;
            }

            console.log("Old hosts: " + oldHosts);
            console.log("New hosts: " + newHosts);
            console.log("Old ports: " + oldPorts);
            console.log("New ports: " + newPorts);


            if (oldPortDevices.length > newPortDevices.length) {

                var portsToDelete = oldPorts - newPorts;
                var portID = oldPorts;

                for (var i = 0; i < portsToDelete; i++) {

                    nodes.remove(portID);

                    var edgesToRemove = edges.get({
                        filter: function (edge) {
                            return edge.to == portID;
                        }
                    });

                    for (var j = 0; j < edgesToRemove.length; j++) {

                        var nodeID = parseInt(edgesToRemove[j].from);
                        nodes.remove(nodeID);
                    }

                    portID -= 1;
                }

                for (var i = 0; i < newPortDevices.length; i++) {

                    var oldPortCount = parseInt(oldPortDevices[i]);
                    var newPortCount = parseInt(newPortDevices[i]);

                    if (isNaN(oldPortCount)) {
                        oldPortCount = 0;
                    } else if (isNaN(newPortCount)) {
                        newPortCount = 0;
                    }

                    if (oldPortCount > newPortCount) {

                        var edgesToRemove = edges.get({
                            filter: function (edge) {
                                return edge.to == i;
                            }
                        });

                        for (var j = 0; j < edgesToRemove.length; j++) {

                            var nodeID = parseInt(edgesToRemove[j].from);
                            nodes.remove(nodeID);

                        }
                    } else if (oldPortCount < newPortCount) {

                        var nodesToAdd = newPortCount - oldPortCount;
                        var portID = i;

                        for (var j = 0; j < nodesToAdd; j++) {
                            var nodeID = _genID();
                            nodes.add({ id: nodeID, label: 'DEVICE', group: 'devices' });
                            edges.add({ from: portID, to: nodeID, color: { color: '#fffff', opacity: 0.3 } });
                        }
                    }
                }

            } else if (oldPortDevices.length < newPortDevices.length) {

                var portsToAdd = newPorts - oldPorts;
                var portID = oldPorts + 1;

                for (var i = 0; i < portsToAdd; i++) {

                    nodes.add({ id: portID, label: 'PORT: ' + (portID), group: 'ports' });
                    edges.add({ from: 0, to: portID, color: { color: '#fffff', opacity: 0.3 } });
                    portID += 1;

                }

                for (var i = 0; i < newPortDevices.length; i++) {

                    var oldPortCount = parseInt(oldPortDevices[i]);
                    var newPortCount = parseInt(newPortDevices[i]);

                    if (isNaN(oldPortCount)) {
                        oldPortCount = 0;
                    } else if (isNaN(newPortCount)) {
                        newPortCount = 0;
                    }

                    if (oldPortCount > newPortCount) {

                        var edgesToRemove = edges.get({
                            filter: function (edge) {
                                return edge.to == i;
                            }
                        });
                        for (var j = 0; j < edgesToRemove.length; j++) {
                            var nodeID = parseInt(edgesToRemove[j].from);
                            nodes.remove(nodeID);
                        }

                    } else if (oldPortCount < newPortCount) {

                        var nodesToAdd = newPortCount - oldPortCount;
                        var portID = i + 1;

                        for (var j = 0; j < nodesToAdd; j++) {
                            var nodeID = _genID();
                            nodes.add({ id: nodeID, label: 'DEVICE', group: 'devices' });
                            edges.add({ from: portID, to: nodeID, color: { color: '#fffff', opacity: 0.3 } });
                        }
                    }
                }
            } else {

                for (var i = 0; i < newPortDevices.length; i++) {

                    var oldPortCount = parseInt(oldPortDevices[i]);
                    var newPortCount = parseInt(newPortDevices[i]);

                    if (isNaN(oldPortCount)) {
                        oldPortCount = 0;
                    } else if (isNaN(newPortCount)) {
                        newPortCount = 0;
                    }

                    if (oldPortCount > newPortCount) {

                        var edgesToRemove = edges.get({
                            filter: function (edge) {
                                return edge.from == i + 1;
                            }
                        });
                        for (var j = 0; j < edgesToRemove.length; j++) {
                            var nodeID = parseInt(edgesToRemove[j].to);
                            console.log(nodeID);
                            nodes.remove(nodeID);
                        }
                    } else if (oldPortCount < newPortCount) {

                        var nodesToAdd = newPortCount - oldPortCount;
                        var portID = i + 1;

                        for (var j = 0; j < nodesToAdd; j++) {
                            var nodeID = _genID();
                            nodes.add({ id: nodeID, label: 'DEVICE', group: 'devices' });
                            edges.add({ from: nodeID, to: portID, color: { color: '#fffff', opacity: 0.3 } });
                        }
                    }
                }
            }
            return [nodes, edges];
        }

        function _genID() {

            var x = 1000;
            var y = 1000000;
            var random = Math.floor(Math.random() * ((y - x) + 1) + x);

            if (nodesID.indexOf(random) !== -1) {
                _genID();
            } else {
                return random;
            }
        }

        function _getGraphOptions() {
            var options = {
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
                        },
                        image: switchImage,
                        shape: 'image',
                        size: 30,
                    },
                    ports: {
                        font: {
                            face: 'times',
                            size: 10,
                            strokeWidth: 0.5,
                            strokeColor: '#000000',
                            bold: {
                                color: '#000000'
                            }
                        },
                        image: portImage,
                        shape: 'image',
                        size: 12,
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
                            code: hostIcon,
                            size: 25,
                            color: '#000000'
                        }
                    }
                }
            };
            return options;
        }

        return {
            getGraphData: _getGraphData,
            updateGraphData: _updateGraphData,
            getGraphOptions: _getGraphOptions
        }
    }]);