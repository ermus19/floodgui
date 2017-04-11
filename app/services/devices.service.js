'use strict';

angular.module('devices.service', [])

    .factory('devicesService', ['restService', 'storageService', function (restService, storageService) {

        var devices = [];
        var switchID = undefined;
        var ports = 0;

        function _getDevices() {
            return devices.slice(0);
        }

        function _setDevices(toSave) {
            devices = toSave.slice(0);
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

        function _fillDevices(data) {

            for (var i = 0; i < data.devices.length; i++) {

                var device = { id: i, alias: '', type: '', icon: '', mac: '', switch: '', port: '', ipv4: '', dhcpName: '' };

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

                if (data.devices[i].hasOwnProperty('dhcpClientName')) {
                    device.dhcpName = data.devices[i].dhcpClientName;
                }

                devices.push(device);

            }

            return devices;
        }

        return {
            getDevices: _getDevices,
            setDevices: _setDevices,
            getSwitchID: _getSwitchID,
            setSwitchID: _setSwitchID,
            getPorts: _getPorts,
            fillDevices: _fillDevices
        }

    }]);