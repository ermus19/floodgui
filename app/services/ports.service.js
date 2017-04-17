'use strict';

angular.module('ports.service', [])

    .factory('portsService', ['devicesService', 'utilsService', function (devicesService, utilsService) {

        var ports = [];
        var portsCount = 0;

        function _getPorts() {
            var copy = JSON.stringify(ports);
            return JSON.parse(copy);
        }

        function _setPorts(toSave) {
            var copy = JSON.stringify(toSave);
            ports = JSON.parse(copy);
        }

        function _getPortsCount() {
            return portsCount;
        }

        function _updatePorts(data) {

            var switchID = devicesService.getSwitchID();

            if (data[switchID].port_desc.length === 0) {
                ports = [];
                return ports;
            }

            ports = [];

            for (var i = 0; i < data[switchID].port_desc.length; i++) {

                var port = { name: '-', port_number: '-', max_speed: '-', tx_speed: '-', rx_speed: '-' }

                port.name = data[switchID].port_desc[i].name;
                port.port_number = data[switchID].port_desc[i].port_number;

                var max_speed = parseInt(data[switchID].port_desc[i].max_speed);

                if(max_speed !== 0){
                    port.max_speed = data[switchID].port_desc[i].max_speed + ' bit/s';
                }

                ports.push(port);

            }
            return ports;
        }

        function _updatePortStats(updated_ports, data) {

            if (data.length > 0) {

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < updated_ports.length; j++) {

                        var statsPort = parseInt(data[i].port);
                        var currentPort = parseInt(updated_ports[j].port_number);

                        if (statsPort === currentPort) {

                            updated_ports[j].rx_speed = utilsService.convertBw(data[i]['bits-per-second-rx']);
                            updated_ports[j].tx_speed = utilsService.convertBw(data[i]['bits-per-second-tx']);

                        }

                    }
                }
            }
            ports = updated_ports;
            return updated_ports;
        }

        return {
            getPorts: _getPorts,
            setPorts: _setPorts,
            getPortsCount: _getPortsCount,
            updatePorts: _updatePorts,
            updatePortStats: _updatePortStats
        }

    }]);