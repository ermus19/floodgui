'use strict';

describe('Ports Controller:', function () {

    var $controller;
    var $rootScope;
    var $window;
    var $httpBackend;
    var $location;
    var $interval;
    var $timeout;
    var devicesService;
    var storageService;
    var portsService;

    beforeEach(function () {
        module('ports.controller');
        module('devices.service');
        module('ports.service');
        module('utils.service');
        module('rest.service');
        module('storage.service');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$window_, _$httpBackend_, _$location_, _$interval_, _$timeout_, _devicesService_, _storageService_, _portsService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $interval = _$interval_;
        $timeout = _$timeout_;
        devicesService = _devicesService_;
        portsService = _portsService_;
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
        var controller = $controller('ports.controller', { $scope: $scope });
        expect($scope.showEmptyPorts).to.be.false;
        expect($scope.showPortsList).to.be.false;
        expect($scope.showPortsLoading).to.be.true;
        expect($scope.ports).to.be.empty;
    });

    it('Should behave correctly when retrieving ports list', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var portsServiceStub = sinon.stub(portsService, "getPorts").returns([]);
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        $httpBackend.when('GET', "http://localhost:8080/wm/core/switch/all/port-desc/json").respond({
            "00:00:00:e0:4c:53:44:58": {
                "version": "OF_13",
                "port_desc": [
                    {
                        "port_number": "6",
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
                    }]
            }
        });
        $httpBackend.when('GET', "http://localhost:8080/wm/statistics/bandwidth/00:00:00:e0:4c:53:44:58/all/json").respond([
            {
                "dpid": "00:00:00:e0:4c:53:44:58",
                "port": "6",
                "updated": "Mon Apr 17 20:13:13 CEST 2017",
                "link-speed-bits-per-second": "0",
                "bits-per-second-rx": "0",
                "bits-per-second-tx": "465"
            }]);
        $httpBackend.when('GET', "http://localhost:8080/wm/portblocker/list/json").respond({
            "00:00:00:e0:4c:53:44:58": [
                {
                    "port": "6",
                    "status": "enabled"
                }]
        });
        $interval.flush(1700);
        $httpBackend.flush();
        expect($scope.ports).to.not.be.empty;
        expect(portsServiceStub.callCount).to.be.equal(1);
        expect(configStubLocation.callCount).to.be.equal(3);
        expect(devicesServiceStub.callCount).to.be.equal(2);
    });

    it('Should behave correctly when retrieving ports list and switch id is undefined', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var portsServiceStub = sinon.stub(portsService, "getPorts").returns([]);
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns(undefined);
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var locationSpy = sinon.spy($location, 'path');
        $interval.flush(1700);
        expect($scope.ports).to.be.empty;
        expect(portsServiceStub.callCount).to.be.equal(1);
        expect(configStubLocation.callCount).to.be.equal(0);
        expect(devicesServiceStub.callCount).to.be.equal(1);
        assert(locationSpy.calledWith('/home'));
        expect($rootScope.showMenu).to.be.false;
    });

    it('Should enable port 6: no error', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/enable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": true
        });
        $scope.enablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.false;
        windowAlertSpy.restore();
    });

    it('Should not enable port 6: success: false', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/enable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": false
        });
        $scope.enablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.true;
        assert(windowAlertSpy.calledWith("Couldn't enable port: 6"));
        windowAlertSpy.restore();
    });

    it('Should not enable port 6: request error', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/enable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond(400, { response: "test" });
        $scope.enablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.true;
        windowAlertSpy.restore();
    });

    it('Should disable port 6: no error', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/disable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": true
        });
        $scope.disablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.false;
        windowAlertSpy.restore();
    });

    it('Should not disable port 6: success: false', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/disable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond({
            "success": false
        });
        $scope.disablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.true;
        assert(windowAlertSpy.calledWith("Couldn't disable port: 6"));
        windowAlertSpy.restore();
    });

    it('Should not disable port 6: request error', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('ports.controller', { $scope: $scope });
        var configStubLocation = sinon.stub(storageService, "getLocation").returns('localhost');
        var devicesServiceStub = sinon.stub(devicesService, "getSwitchID").returns('00:00:00:e0:4c:53:44:58');
        var windowAlertSpy = sinon.spy($window, 'alert');
        $httpBackend.expect('POST', "http://localhost:8080/wm/portblocker/disable/json",
            { dpid: '00:00:00:e0:4c:53:44:58', port: 6 }
        ).respond(400);
        $scope.disablePort(6);
        $httpBackend.flush();
        expect(windowAlertSpy.called).to.be.true;
        windowAlertSpy.restore();
    });

});