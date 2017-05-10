'use strict';

describe('Stats Controller:', function () {

    var $controller;
    var $rootScope;
    var $httpBackend;
    var $location;
    var $interval;
    var $rootScope;
    var storageService;

    beforeEach(function () {
        module('stats.controller');
        module('rest.service');
        module('utils.service');
        module('storage.service');
        module('ports.service');
        module('devices.service');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$location_, _$interval_, _storageService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $interval = _$interval_;
        storageService = _storageService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Expects controller to be defined', function () {
        expect($controller).to.not.be.undefined;
    });

    it('Should have variables correctly set on controller default', function () {
        var $scope = $rootScope.$new();
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var controller = $controller('stats.controller', { $scope: $scope });
        $httpBackend.when('GET', "http://localhost:8080/wm/core/version/json").respond({
            "name": "floodlight",
            "version": "1.2-SNAPSHOT"
        });
        $httpBackend.flush();
        expect($scope.showUptime).to.be.false;
        expect($scope.showMemory).to.be.false;
        expect($scope.showApiHealth).to.be.false;
        expect($scope.showFirewallStatus).to.be.false;
        expect($scope.showOFversion).to.be.false;
        expect($scope.showHostsCount).to.be.false;
        expect($scope.showSwitch).to.be.false;
        expect($scope.memoryState).to.be.equal('list-group-item');
        expect($scope.apiHealthState).to.be.equal('list-group-item');
        expect($scope.version).to.be.equal("1.2-SNAPSHOT");
        expect($scope.showVersion).to.be.true;
    });

    it('Should get all the controller stats: api health good', function () {
        var $scope = $rootScope.$new();
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var controller = $controller('stats.controller', { $scope: $scope });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/version/json").respond({
            "name": "floodlight",
            "version": "1.2-SNAPSHOT"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/switches/json").respond([
            {
                "inetAddress": "/192.168.1.17:54924",
                "connectedSince": 1491560615975,
                "switchDPID": "00:00:00:e0:4c:53:44:58",
                "openFlowVersion": "OF_13"
            }
        ]);


        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/summary/json").respond({
            "# Switches": 1,
            "# inter-switch links": 0,
            "# quarantine ports": 0,
            "# hosts": 5
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/memory/json").respond({
            "total": 264765440,
            "free": 231007368
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/firewall/module/status/json").respond({
            "result": "firewall disabled"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/health/json").respond({
            "healthy": true
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $interval.flush(6000);
        $httpBackend.flush();
        expect($scope.OFVersion).to.be.equal("OF_13");
        expect($scope.showOFversion).to.be.true;
        expect($scope.showSwitch).to.be.true;
        expect($scope.hosts).to.be.equal(5);
        expect($scope.showHostsCount).to.be.true;
        expect($scope.memory).to.be.equal('12.8 %');
        expect($scope.memoryState).to.be.equal('list-group-item list-group-item-success');
        expect($scope.showMemory).to.be.true;
        expect($scope.firewallStatus).to.be.equal('firewall disabled');
        expect($scope.showFirewallStatus).to.be.true;
        expect($scope.apiHealth).to.be.equal('good');
        expect($scope.apiHealthState).to.be.equal('list-group-item list-group-item-success');
    });

    it('Should get all the controller stats: api health bad', function () {
        var $scope = $rootScope.$new();
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var controller = $controller('stats.controller', { $scope: $scope });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/version/json").respond({
            "name": "floodlight",
            "version": "1.2-SNAPSHOT"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/switches/json").respond([
            {
                "inetAddress": "/192.168.1.17:54924",
                "connectedSince": 1491560615975,
                "switchDPID": "00:00:00:e0:4c:53:44:58",
                "openFlowVersion": "OF_13"
            }
        ]);


        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/summary/json").respond({
            "# Switches": 1,
            "# inter-switch links": 0,
            "# quarantine ports": 0,
            "# hosts": 5
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/memory/json").respond({
            "total": 264765440,
            "free": 231007368
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/firewall/module/status/json").respond({
            "result": "firewall disabled"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/health/json").respond({
            "healthy": false
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $interval.flush(6000);
        $httpBackend.flush();
        expect($scope.OFVersion).to.be.equal("OF_13");
        expect($scope.showOFversion).to.be.true;
        expect($scope.showSwitch).to.be.true;
        expect($scope.hosts).to.be.equal(5);
        expect($scope.showHostsCount).to.be.true;
        expect($scope.memory).to.be.equal('12.8 %');
        expect($scope.memoryState).to.be.equal('list-group-item list-group-item-success');
        expect($scope.showMemory).to.be.true;
        expect($scope.firewallStatus).to.be.equal('firewall disabled');
        expect($scope.showFirewallStatus).to.be.true;
        expect($scope.apiHealth).to.be.equal('bad');
        expect($scope.apiHealthState).to.be.equal('list-group-item list-group-item-danger');
    });

    it('Should get all the controller stats: undefined switchid', function () {
        var $scope = $rootScope.$new();
        var configStub = sinon.stub(storageService, "getLocation").returns('localhost');
        var controller = $controller('stats.controller', { $scope: $scope });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/version/json").respond({
            "name": "floodlight",
            "version": "1.2-SNAPSHOT"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/switches/json").respond([]);
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/controller/summary/json").respond({
            "# Switches": 1,
            "# inter-switch links": 0,
            "# quarantine ports": 0,
            "# hosts": 5
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/memory/json").respond({
            "total": 264765440,
            "free": 231007368
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/firewall/module/status/json").respond({
            "result": "firewall disabled"
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/health/json").respond({
            "healthy": false
        });
        $httpBackend.expect('GET', "http://localhost:8080/wm/core/system/uptime/json").respond({
            "systemUptimeMsec": 269760
        });
        $interval.flush(6000);
        $httpBackend.flush();
        expect($scope.showOFversion).to.be.false;
        expect($scope.showSwitch).to.be.false;
        expect($scope.hosts).to.be.equal(5);
        expect($scope.showHostsCount).to.be.true;
        expect($scope.memory).to.be.equal('12.8 %');
        expect($scope.memoryState).to.be.equal('list-group-item list-group-item-success');
        expect($scope.showMemory).to.be.true;
        expect($scope.firewallStatus).to.be.equal('firewall disabled');
        expect($scope.showFirewallStatus).to.be.true;
        expect($scope.apiHealth).to.be.equal('bad');
        expect($scope.apiHealthState).to.be.equal('list-group-item list-group-item-danger');
    });

});