'use strict';

describe('Devices Service:', function () {

    var devicesService;

    beforeEach(function () {
        module('devices.service');
        module('utils.service');
    });

    beforeEach(inject(function (_devicesService_) {
        devicesService = _devicesService_;
    }));

    it('Expects Devices Service to be defined', function () {
        expect(devicesService).to.not.be.undefined;
    });

    it('Expects functions to be set', function () {
        expect(devicesService.getDevices).to.not.be.undefined;
        expect(typeof devicesService.getDevices).to.be.equal('function');
        expect(devicesService.setDevices).to.not.be.undefined;
        expect(typeof devicesService.setDevices).to.be.equal('function');
        expect(devicesService.getDevicesCount).to.not.be.undefined;
        expect(typeof devicesService.getDevicesCount).to.be.equal('function');
        expect(devicesService.getSwitchID).to.not.be.undefined;
        expect(typeof devicesService.getSwitchID).to.be.equal('function');
        expect(devicesService.setSwitchID).to.not.be.undefined;
        expect(typeof devicesService.setSwitchID).to.be.equal('function');
        expect(devicesService.getPorts).to.not.be.undefined;
        expect(typeof devicesService.getPorts).to.be.equal('function');
        expect(devicesService.updateDevices).to.not.be.undefined;
        expect(typeof devicesService.updateDevices).to.be.equal('function');
        expect(devicesService.getPortCount).to.not.be.undefined;
        expect(typeof devicesService.getPortCount).to.be.equal('function');
    });

    it('Expects to correctly set devices[]', function () {
        expect(devicesService.getDevices()).to.be.instanceof(Array);
        expect(devicesService.getDevices()).to.be.empty;
        expect(devicesService.getDevicesCount()).to.be.equal(0);
        var devices = [1, 2, 3, 4];
        devicesService.setDevices(devices);
        expect(devicesService.getDevices()).to.be.instanceof(Array);
        expect(devicesService.getDevices()).to.be.lengthOf(4);
        expect(devicesService.getDevicesCount()).to.be.equal(4);
    });

    it('Expects to correctly set switchID', function () {
        expect(devicesService.getSwitchID()).to.be.undefined;
        devicesService.setSwitchID("00:00:00:e0:4c:53:44:58");
        expect(devicesService.getSwitchID()).to.be.equal("00:00:00:e0:4c:53:44:58");
    });

    it('Expects ports to be equal 0 before updating collection', function () {
        expect(devicesService.getPorts()).to.be.equal(0);
    });

    it('Expects devices and port count to be empty if data is empty', function () {
        var data = { devices: [] };
        expect(devicesService.updateDevices(data)).to.be.empty;
        expect(devicesService.getPortCount()).to.be.empty;
        expect(devicesService.getPorts()).to.be.equal(0);
    });

    it('Expects devices and port count to be filled with sample data', function () {
        var data = {
            "devices": [
                {
                    "entityClass": "DefaultEntityClass",
                    "mac": [
                        "00:00:00:00:00:00"
                    ],
                    "ipv4": [],
                    "ipv6": [],
                    "vlan": [
                        "0x0"
                    ],
                    "attachmentPoint": [
                        {
                            "switch": "00:00:00:e0:4c:53:44:58",
                            "port": "6"
                        }
                    ],
                    "lastSeen": 1491561241781
                },
                {
                    "entityClass": "DefaultEntityClass",
                    "mac": [
                        "00:00:00:00:00:00"
                    ],
                    "ipv4": [],
                    "ipv6": [
                        "fe80::1481:4896:8119:e9a"
                    ],
                    "vlan": [
                        "0x0"
                    ],
                    "attachmentPoint": [
                        {
                            "switch": "00:00:00:e0:4c:53:44:58",
                            "port": "1"
                        }
                    ],
                    "lastSeen": 1491561218697
                },
                {
                    "entityClass": "DefaultEntityClass",
                    "mac": [
                        "00:00:00:00:00:00"
                    ],
                    "ipv4": [
                        "192.168.1.17"
                    ],
                    "ipv6": [],
                    "vlan": [
                        "0x0"
                    ],
                    "attachmentPoint": [
                        {
                            "switch": "00:00:00:e0:4c:53:44:58",
                            "port": "local"
                        }
                    ],
                    "lastSeen": 1491561221333
                },
                {
                    "entityClass": "DefaultEntityClass",
                    "mac": [
                        "00:00:00:00:00:00"
                    ],
                    "ipv4": [
                        "192.168.1.11"
                    ],
                    "ipv6": [
                        "fe80::c5e:ed7b:46da:acd8"
                    ],
                    "vlan": [
                        "0x0"
                    ],
                    "attachmentPoint": [
                        {
                            "switch": "00:00:00:e0:4c:53:44:58",
                            "port": "6"
                        }
                    ],
                    "lastSeen": 1491561210460,
                    "dhcpClientName": "iPhone"
                }
            ]
        };

        expect(devicesService.updateDevices(data)).to.not.be.empty;
        expect(devicesService.updateDevices(data)).to.be.lengthOf(4);
        expect(devicesService.getPortCount()).to.be.lengthOf(6);
        expect(devicesService.getPortCount()).to.be.deep.equal([1, 0, 0, 0, 0, 2]);
        expect(devicesService.getPorts()).to.be.equal(6);
    });
});