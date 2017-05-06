'use strict';

describe('Rest Service:', function () {

    var restService;
    var storageService;
    var $httpBackend;

    beforeEach(function () {
        module('rest.service');
        module('storage.service');
    });

    beforeEach(inject(function (_restService_, _storageService_, _$httpBackend_) {
        restService = _restService_;
        storageService = _storageService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('Expects Rest Service to be defined', function () {
        expect(restService).to.not.be.undefined;
    });

    it('Expects functions to be set', function () {
        expect(restService.getMemory).to.not.be.undefined;
        expect(typeof restService.getMemory).to.be.equal('function');
        expect(restService.getApiHealth).to.not.be.undefined;
        expect(typeof restService.getApiHealth).to.be.equal('function');
        expect(restService.getVersion).to.not.be.undefined;
        expect(typeof restService.getVersion).to.be.equal('function');
        expect(restService.getUptime).to.not.be.undefined;
        expect(typeof restService.getUptime).to.be.equal('function');
        expect(restService.getFirewallStatus).to.not.be.undefined;
        expect(typeof restService.getFirewallStatus).to.be.equal('function');
        expect(restService.getSummary).to.not.be.undefined;
        expect(typeof restService.getSummary).to.be.equal('function');
        expect(restService.getSwitches).to.not.be.undefined;
        expect(typeof restService.getSwitches).to.be.equal('function');
        expect(restService.getDevices).to.not.be.undefined;
        expect(typeof restService.getDevices).to.be.equal('function');
        expect(restService.getPorts).to.not.be.undefined;
        expect(typeof restService.getPorts).to.be.equal('function');
        expect(restService.getPortsStats).to.not.be.undefined;
        expect(typeof restService.getPortsStats).to.be.equal('function');
        expect(restService.getPortsState).to.not.be.undefined;
        expect(typeof restService.getPortsState).to.be.equal('function');
        expect(restService.disablePort).to.not.be.undefined;
        expect(typeof restService.disablePort).to.be.equal('function');
        expect(restService.enablePort).to.not.be.undefined;
        expect(typeof restService.enablePort).to.be.equal('function');
    });

    it('Expect getMemory() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/memory/json").respond({
            "total": 264765440,
            "free": 231007368
        });
        var response = restService.getMemory().query();
        $httpBackend.flush();
        expect(response.total).to.be.equal(264765440);
        expect(response.free).to.be.equal(231007368);
    });

    it('Expect getApiHealth() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/health/json").respond({
            "healthy": true
        });
        var response = restService.getApiHealth().query();
        $httpBackend.flush();
        expect(response.healthy).to.be.true;
    });

    it('Expect getVersion() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/version/json").respond({
            "name": "floodlight",
            "version": "1.2-SNAPSHOT"
        });
        var response = restService.getVersion().query();
        $httpBackend.flush();
        expect(response.name).to.be.equal("floodlight");
        expect(response.version).to.be.equal("1.2-SNAPSHOT");
    });

    it('Expect getUptime() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        var response = restService.getUptime().query();
        $httpBackend.flush();
        expect(response.systemUptimeMsec).to.be.equal(269760);
    });

    it('Expect getFirewallStatus() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/firewall/module/status/json").respond({
            "result": "firewall disabled"
        });
        var response = restService.getFirewallStatus().query();
        $httpBackend.flush();
        expect(response.result).to.be.equal("firewall disabled");
    });

    it('Expect getSummary() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/controller/summary/json").respond({
            "# Switches": 1,
            "# inter-switch links": 0,
            "# quarantine ports": 0,
            "# hosts": 5
        });
        var response = restService.getSummary().query();
        $httpBackend.flush();
        expect(response['# Switches']).to.be.equal(1);
        expect(response['# inter-switch links']).to.be.equal(0);
        expect(response['# quarantine ports']).to.be.equal(0);
        expect(response['# hosts']).to.be.equal(5);
    });

    it('Expect getSwitches() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/controller/switches/json").respond([
            {
                "inetAddress": "/192.168.1.17:54924",
                "connectedSince": 1491560615975,
                "switchDPID": "00:00:00:e0:4c:53:44:58",
                "openFlowVersion": "OF_13"
            }
        ]);
        var response = restService.getSwitches().query();
        $httpBackend.flush();
        expect(response[0].inetAddress).to.be.equal("/192.168.1.17:54924");
        expect(response[0].connectedSince).to.be.equal(1491560615975);
        expect(response[0].switchDPID).to.be.equal("00:00:00:e0:4c:53:44:58");
        expect(response[0].openFlowVersion).to.be.equal("OF_13");
    });

    it('Expect getDevices() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/device/").respond({
            "devices": [
                {
                    "mac": ["00:00:00:00:00:00"],
                    "ipv4": ["192.168.1.17"],
                    "ipv6": ["fe80::1481:4896:8119:e9a"],
                    "attachmentPoint": [
                        {
                            "switch": "00:00:00:e0:4c:53:44:58",
                            "port": "6"
                        }],
                    "lastSeen": 1491561241781,
                    "dhcpClientName": "iPhone"
                }
            ]
        });
        var response = restService.getDevices().query();
        $httpBackend.flush();
        expect(response.devices[0].mac[0]).to.be.equal("00:00:00:00:00:00");
        expect(response.devices[0].ipv4[0]).to.be.equal("192.168.1.17");
        expect(response.devices[0].ipv6[0]).to.be.equal("fe80::1481:4896:8119:e9a");
        expect(response.devices[0].attachmentPoint[0].port).to.be.equal("6");
        expect(response.devices[0].attachmentPoint[0].switch).to.be.equal("00:00:00:e0:4c:53:44:58");
        expect(response.devices[0].lastSeen).to.be.equal(1491561241781);
        expect(response.devices[0].dhcpClientName).to.be.equal("iPhone");
    });

    it('Expect getPorts() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/switch/all/port-desc/json").respond({
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
                        ],
                        "advertised_features": [
                            "PF_10MB_HD",
                            "PF_10MB_FD",
                            "PF_100MB_HD",
                            "PF_100MB_FD",
                            "PF_COPPER",
                            "PF_AUTONEG",
                            "PF_PAUSE",
                            "PF_PAUSE_ASYM"
                        ],
                        "supported_features": [
                            "PF_10MB_HD",
                            "PF_10MB_FD",
                            "PF_100MB_HD",
                            "PF_100MB_FD",
                            "PF_COPPER",
                            "PF_AUTONEG"
                        ],
                        "peer_features": [],
                        "curr_speed": "100000",
                        "max_speed": "100000"
                    }
                ]
            }
        });
        var response = restService.getPorts().query();
        $httpBackend.flush();
        expect(response['00:00:00:e0:4c:53:44:58'].version).to.be.equal("OF_13");
    });

    it('Expect getPortsStats() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/statistics/bandwidth/00:00:00:e0:4c:53:44:58/all/json").respond([
            {
                "dpid": "00:00:00:e0:4c:53:44:58",
                "port": "6",
                "updated": "Mon Apr 17 20:13:13 CEST 2017",
                "link-speed-bits-per-second": "0",
                "bits-per-second-rx": "0",
                "bits-per-second-tx": "465"
            }
        ]);
        var response = restService.getPortsStats().query({ switchID: '00:00:00:e0:4c:53:44:58' });
        $httpBackend.flush();
        expect(response[0].dpid).to.be.equal("00:00:00:e0:4c:53:44:58");
        expect(response[0].port).to.be.equal("6");
        expect(response[0].updated).to.be.equal("Mon Apr 17 20:13:13 CEST 2017");
    });

    it('Expect getPortsState() to get correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/portblocker/list/json").respond({
            "00:00:00:e0:4c:53:44:58": [
                {
                    "port": "1",
                    "status": "enabled"
                },
                {
                    "port": "3",
                    "status": "enabled"
                },
                {
                    "port": "4",
                    "status": "enabled"
                },
                {
                    "port": "5",
                    "status": "enabled"
                },
                {
                    "port": "6",
                    "status": "disabled"
                }
            ]
        });
        var response = restService.getPortsState().query();
        $httpBackend.flush();
        expect(response['00:00:00:e0:4c:53:44:58'][0].port).to.be.equal("1");
        expect(response['00:00:00:e0:4c:53:44:58'][0].status).to.be.equal("enabled");
    });

    it('Expect disablePort() to post correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var post = { dpid: '00:00:00:e0:4c:53:44:58', port: 6 };
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/disable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": true
        });
        var response = restService.disablePort().save(post);
        $httpBackend.flush();
        expect(response.success).to.be.true;
    });

    it('Expect enablePort() to post correct data', function () {
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var post = { dpid: '00:00:00:e0:4c:53:44:58', port: 6 };
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/enable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": true
        });
        var response = restService.enablePort().save(post);
        $httpBackend.flush();
        expect(response.success).to.be.true;
    });

});