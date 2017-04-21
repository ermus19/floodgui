'use strict';

angular.module('devices.service', [])

    .factory('devicesService', ['utilsService', function (utilsService) {

        var devices = [];
        var switchID = undefined;
        var ports = 0;

        function _getDevices() {
            var copy = JSON.stringify(devices);
            return JSON.parse(copy);
        }

        function _setDevices(toSave) {
            var copy = JSON.stringify(toSave);
            devices = JSON.parse(copy);
        }

        function _getDevicesCount() {
            return devices.length;
        }

        function _getSwitchID() {
            return switchID;
        }

        function _setSwitchID(id) {
            switchID = id;
        }

        function _getPorts() {
            return ports;
        }

        function _updateDevices(data) {

            if(data.devices.length === 0){
                devices = []; 
                return  devices;
            }

            devices = [];

            for (var i = 0; i < data.devices.length; i++) {

                var device = { id: i, mac: '-', switch: '-', port: '-', ipv4: '-', ipv6: '-', dhcpName: '-', lastSeen: '-' };

                if (data.devices[i].mac.length > 0) {
                    device.mac = data.devices[i].mac[0];
                }
                if (data.devices[i].attachmentPoint.length > 0) {
                    device.switch = data.devices[i].attachmentPoint[0].switch;
                    device.port = data.devices[i].attachmentPoint[0].port;

                    if (ports < parseInt(device.port)) {
                        ports = parseInt(device.port);
                    }
                }

                if (data.devices[i].ipv4.length > 0) {
                    device.ipv4 = data.devices[i].ipv4[0];
                }

                if (data.devices[i].ipv6.length > 0) {
                    device.ipv6 = data.devices[i].ipv6[0];
                }

                if (data.devices[i].hasOwnProperty('lastSeen')) {
                    device.lastSeen = utilsService.convertTime(data.devices[i].lastSeen);
                }


                if (data.devices[i].hasOwnProperty('dhcpClientName')) {
                    device.dhcpName = data.devices[i].dhcpClientName;
                }

                devices.push(device);

            }

            return devices;
        }

        function _getPortCount() {

            var portDevices = [];

            for (var i = 0; i < ports; i++) {

                var devicesCount = 0;

                for (var j = 0; j < devices.length; j++) {

                    var currentPort = parseInt(devices[j].port);

                    if (currentPort === (i + 1)) {

                        devicesCount += 1;

                    }
                }
                portDevices.push(devicesCount);
            }

            return portDevices.slice(0);
        }

        return {
            getDevices: _getDevices,
            setDevices: _setDevices,
            getDevicesCount: _getDevicesCount,
            getSwitchID: _getSwitchID,
            setSwitchID: _setSwitchID,
            getPorts: _getPorts,
            getPortCount: _getPortCount,
            updateDevices: _updateDevices
        }

    }]);