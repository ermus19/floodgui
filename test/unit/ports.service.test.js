'use strict';

describe('Ports Service:', function () {

    var portsService;
    var devicesService;

    beforeEach(function () {
        module('ports.service');
        module('devices.service');
        module('utils.service');
    });

    beforeEach(inject(function (_portsService_, _devicesService_) {
        portsService = _portsService_;
        devicesService = _devicesService_;
    }));

    it('Expects Ports Service to be defined', function () {
        expect(portsService).to.not.be.undefined;
    });

    it('Expects functions to be set', function () {
        expect(portsService.getPorts).to.not.be.undefined;
        expect(typeof portsService.getPorts).to.be.equal('function');
        expect(portsService.setPorts).to.not.be.undefined;
        expect(typeof portsService.setPorts).to.be.equal('function');
        expect(portsService.getPortsCount).to.not.be.undefined;
        expect(typeof portsService.getPortsCount).to.be.equal('function');
        expect(portsService.updatePorts).to.not.be.undefined;
        expect(typeof portsService.updatePorts).to.be.equal('function');
        expect(portsService.updatePortStats).to.not.be.undefined;
        expect(typeof portsService.updatePortStats).to.be.equal('function');
        expect(portsService.updatePortStates).to.not.be.undefined;
        expect(typeof portsService.updatePortStates).to.be.equal('function');
    });

    it('Expects to correctly set ports[]', function () {
        expect(portsService.getPorts()).to.be.instanceof(Array);
        expect(portsService.getPorts()).to.be.empty;
        expect(portsService.getPortsCount()).to.be.equal(0);
        var ports = [1, 2, 3, 4];
        portsService.setPorts(ports);
        expect(portsService.getPorts()).to.be.instanceof(Array);
        expect(portsService.getPorts()).to.be.lengthOf(4);
        expect(portsService.getPortsCount()).to.be.equal(0);
    });

    it('Expect to correctly add ports objects on updatePorts(data)', function () {
        var switchIDstub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var data = {
            "00:00:00:e0:4c:53:44:58": {
                "version": "OF_13",
                "port_desc": [
                    {
                        "port_number": "4",
                        "hardware_address": "00:00:00:00:00:00",
                        "name": "eth3",
                        "config": [],
                        "state": [
                            "LINK_DOWN"
                        ],
                        "current_features": [
                            "PF_100MB_FD",
                            "PF_AUTONEG"
                        ]
                    }
                ]
            }
        };
        expect(portsService.updatePorts(data)).to.not.be.empty;
        expect(portsService.updatePorts(data)).to.be.lengthOf(1);
        data = {
            "00:00:00:e0:4c:53:44:58": {
                "version": "OF_13",
                "port_desc": []
            }
        };
        expect(portsService.updatePorts(data)).to.be.empty;
        expect(portsService.updatePorts(data)).to.be.lengthOf(0);
    });

    it('Expect to correctly update ports objects on updatePortsStats(updated_ports, data)', function () {
        var updated_ports = [{ name: 'eth3', port_number: '4', max_speed: '-', tx_speed: '-', rx_speed: '-', status: 'enabled' }];
        var data = [
            {
                "dpid": "00:00:00:e0:4c:53:44:58",
                "port": "4",
                "updated": "Mon Apr 17 20:13:13 CEST 2017",
                "link-speed-bits-per-second": "0",
                "bits-per-second-rx": "0",
                "bits-per-second-tx": "465"
            }
        ];
        expect(portsService.updatePortStats(updated_ports, data)).to.not.be.empty;
        expect(portsService.updatePortStats(updated_ports, data)).to.be.lengthOf(1);
    });

    it('Expect to correctly update empty ports objects on updatePortsStates(switchID, updated_ports, data)', function () {
        var switchID = '00:00:00:e0:4c:53:44:58';
        var updated_ports = [];
        var data = {};
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.empty;
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.lengthOf(0);
        var data = { "00:00:00:e0:4c:53:44:58": [] };
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.empty;
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.lengthOf(0);
    });

    it('Expect to correctly update ports objects on updatePortsStates(switchID, updated_ports, data)', function () {
        var switchID = '00:00:00:e0:4c:53:44:58';
        var updated_ports = [{ name: 'eth3', port_number: '4', max_speed: '-', tx_speed: '-', rx_speed: '-', status: 'enabled' }];
        var data = {
            "00:00:00:e0:4c:53:44:58": [
                {
                    "port": "4",
                    "status": "disabled"
                }
            ]
        };
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.not.be.empty;
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.lengthOf(1);
        expect(portsService.updatePortStates(switchID, updated_ports, data)).to.be.deep.equal([{ name: 'eth3', port_number: '4', max_speed: '-', tx_speed: '-', rx_speed: '-', status: 'disabled' }]);
    });

});